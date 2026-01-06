# DevOps Project – Color to Grayscale Conversion

## Team Members

- **Tommaso Marchesini** – Pipeline configuration, Galileo100 integration, SLURM job management  
- **Benedetta Mussini** – Test case design, correctness and robustness coverage  
- **Fabio Rossi** – CI/CD setup, deployment automation, Singularity integration  
- **Riccardo Stoppani** – Test suite development, cross-method and edge case testing  

---

## Test Cases

The test suite includes over 120 independent Google Test cases, designed to verify the correctness and robustness of the `convertToGrayscale()` function under multiple scenarios. The suite is organized as follows:

- **Channel Copy Methods** (18 tests): Verifies that Red, Green, and Blue channel copy modes return the exact value of the selected component without transformation.
  
- **Arithmetic Mean Method** (15 tests): Checks that grayscale is computed as the integer average `(R + G + B) / 3`, using diverse RGB triplets including edge values and skewed distributions.
  
- **Lightness Method** (10 tests): Ensures correct computation via desaturation formula `(max(R,G,B) + min(R,G,B)) / 2`.
  
- **Luminosity Method** (15 tests): Validates the perceptual grayscale model `0.21*R + 0.72*G + 0.07*B` with truncation, covering both edge cases and real-world RGB mixes.
  
- **Root Mean Square Method** (15 tests): Confirms proper use of `sqrt((R² + G² + B²)/3)` with accurate casting, including uniform and outlier pixels.
  
- **Cross-Method Consistency** (40 tests): For 10 RGB samples, verifies each grayscale method against its mathematical reference implementation.
  
- **Property & Robustness Tests** (8 tests):  
  - Ensures output dimensions match input.  
  - Handles empty images gracefully.  
  - Validates grayscale values are in [0,255].  
  - Checks proper reuse/resizing of output containers.  
  - Assures correct behavior on single-row and single-column images.

All tests use `convertToGrayscale()` directly to test actual library behavior, not reimplemented formulas, ensuring complete API and bounds validation.

---

## CI/CD Pipeline (GitHub Actions)

The GitHub Actions pipeline is triggered on each push or pull request to `main` or `master` and is composed of two main jobs:  

### `build-test-container`

1. **Dependencies Setup**: Installs CMake, Google Test, and Singularity prerequisites.
2. **Build Phase**: Compiles the project using `build.sh`.
3. **Testing Phase**: Executes the full test suite with GoogleTest (`ctest`).
4. **Go Installation**: Required for Singularity.
5. **Singularity Build**: Downloads, compiles, and installs Singularity.
6. **Image Containerization**: Builds the `.sif` container from `Singularity.def`.
7. **Local Container Run**: Executes the container on GitHub Runner to verify runtime behavior.
8. **Artifact Upload**: Uploads both the `grayscale.sif` and `job.sh` files for deployment.

### `deploy`

1. **Artifact Download**: Retrieves the container and job script.
2. **SSH Environment Setup**:  
   - Loads private/public key and short-lived certificate from GitHub Secrets.  
   - Builds `.ssh/config` for authenticated connection to Galileo100.
3. **Secure File Transfer**: Sends `grayscale.sif` and `job.sh` to the user's directory on Galileo100 via SCP.
4. **Job Submission**:  
   - Launches the SLURM job using `sbatch job.sh`.  
   - Monitors job state with `sacct` and `squeue`.  
   - Displays logs from `output.txt` and `error.txt`.

---

## Difficulties and Solutions

### **SSH Certificate Handling**
**Problem**: Galileo100 requires short-lived SSH certificates (~12h validity), complicating persistent CI/CD automation.

**Solution**: We configured the pipeline to import the certificate from GitHub Secrets and avoid host-key verification via `.ssh/config`. However, automation is inherently limited by the 12-hour window—Secrets must be updated manually or via an external rotation mechanism.

---

###  **Connection from GitHub Actions to Galileo100**
**Problem**: GitHub-hosted runners cannot persist secure SSH sessions easily, and failures on remote transfer or SLURM submission are hard to debug.

**Solution**: Added extensive logging after each SSH interaction. Ensured environment setup and permissions (`chmod 600`) were enforced explicitly for all keys and certificates.

---

### **Job Timing and Artifact Availability**
**Problem**: SLURM jobs may take several seconds or minutes to start. Logs are not available immediately, leading to premature reads.

**Solution**: Introduced loop with retries and delay to poll job status (`sacct`) and defer log reading until the job completes or fails.

