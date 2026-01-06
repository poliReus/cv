#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct lista_auto
{
	int km;
	struct lista_auto *next;
	struct lista_auto *prec;
} lista_auto;
typedef struct stazione
{
	int distanza; // filtro per ordinare il vettore in ordine decrescente
	int indice;
	int dist_arr;
	struct stazione *next_station;
	lista_auto *testa_parco_veicoli;
	int n_veicoli;
	struct stazione *destra;
	struct stazione *sinistra;
	struct stazione *padre;
} stazione;
typedef struct struttura
{
	int dist;
	int macchina;
	int dist_arr;
	int index_next_station;
} struttura;
int aggiungi_stazione(stazione **head, int numero_stazioni, stazione *nuova_stazione)
{
	stazione *cursore = *head;
	int distanza;
	int numero_auto;
	int val, i, flag = 1, glaf = 1;
	if (scanf("%d", &distanza) == 1)
		; // leggo la distanza della stazione dall'inizio dell'autostrada
	if (scanf("%d", &numero_auto) == 1)
		; // leggo il numero di auto nel parco di questa stazione
	nuova_stazione->distanza = distanza;
	nuova_stazione->n_veicoli = numero_auto;
	if (numero_auto > 0)
	{
		if (scanf("%d", &val) == 1)
			;

		lista_auto *nuova_macchina;
		nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
		nuova_macchina->km = val;
		nuova_macchina->prec = NULL;
		nuova_macchina->next = NULL;
		nuova_stazione->testa_parco_veicoli = nuova_macchina;
		lista_auto *cursor = nuova_stazione->testa_parco_veicoli;
		for (i = 1; i < numero_auto; i++)
		{
			cursor = nuova_stazione->testa_parco_veicoli;
			if (scanf("%d", &val) == 1)
			{
				while (cursor->next != NULL && val <= cursor->km)
				{
					cursor = cursor->next;
				}
				// in cursor c'è la macchina a cui devo attaccare la nuova
				if (cursor->prec == NULL && cursor->next == NULL)
				{
					// in testa e c'è solo lei
					if (val <= cursor->km)
					{
						// devo attaccarlo dopo
						nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
						nuova_macchina->km = val;
						nuova_macchina->prec = cursor;
						nuova_macchina->next = NULL;
						cursor->next = nuova_macchina;
					}
					else
					{
						// devo attaccarlo prima
						nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
						nuova_macchina->km = val;
						nuova_macchina->prec = NULL;
						nuova_macchina->next = cursor;
						cursor->prec = nuova_macchina;
						nuova_stazione->testa_parco_veicoli = nuova_macchina;
					}
				}
				else if (cursor->prec == NULL)
				{
					// in testa non da solo
					nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
					nuova_macchina->km = val;
					nuova_macchina->next = cursor;
					nuova_macchina->prec = cursor->prec;
					cursor->prec = nuova_macchina;
					nuova_stazione->testa_parco_veicoli = nuova_macchina;
				}
				else if (cursor->next == NULL)
				{
					// sono in coda
					if (val <= cursor->km)
					{
						// devo collegarlo dopo
						nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
						nuova_macchina->km = val;
						nuova_macchina->prec = cursor;
						nuova_macchina->next = NULL;
						cursor->next = nuova_macchina;
					}
					else
					{
						// devo collegarlo prima
						nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
						nuova_macchina->km = val;
						nuova_macchina->prec = cursor->prec;
						nuova_macchina->next = cursor;
						cursor->prec->next = nuova_macchina;
						cursor->prec = nuova_macchina;
						cursor->next = NULL;
					}
				}
				else
				{
					// sono in mezzo
					nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
					nuova_macchina->km = val;
					nuova_macchina->next = cursor;
					nuova_macchina->prec = cursor->prec;
					cursor->prec->next = nuova_macchina;
					cursor->prec = nuova_macchina;
				}
			}
		}
	}

	if (*head == NULL)
	{
		nuova_stazione->destra = NULL;
		nuova_stazione->sinistra = NULL;
		*head = nuova_stazione;
		cursore = *head;
		nuova_stazione->padre = NULL;
	}
	else
	{
		while (flag && glaf)
		{
			if (cursore != NULL && cursore->distanza == nuova_stazione->distanza)
			{
				// sto provando a inserire una stazione già presente
				glaf = 0;
			}
			else if (cursore->destra == NULL && cursore->sinistra == NULL)
			{
				// c'è solo la radice
				if (nuova_stazione->distanza >= cursore->distanza)
				{
					cursore->destra = nuova_stazione;
					nuova_stazione->padre = cursore;
					flag = 0;
				}
				else
				{
					cursore->sinistra = nuova_stazione;
					nuova_stazione->padre = cursore;
					flag = 0;
				}
			}
			else if (cursore->destra == NULL && nuova_stazione->distanza >= cursore->distanza)
			{
				cursore->destra = nuova_stazione;
				nuova_stazione->padre = cursore;
				flag = 0;
			}
			else if (cursore->sinistra == NULL && nuova_stazione->distanza < cursore->distanza)
			{
				cursore->sinistra = nuova_stazione;
				nuova_stazione->padre = cursore;
				flag = 0;
			}
			else
			{
				// non posso inserire, significa che devo scalare nell'albero, a destra se la mia key è maggiore, a sinistra se è minore
				if (glaf && nuova_stazione->distanza >= cursore->distanza)
				{
					cursore = cursore->destra;
				}
				else if (glaf)
				{
					cursore = cursore->sinistra;
				}
			}
		}
	}
	if (!glaf)
	{
		printf("non aggiunta\n");
		return 0;
	}
	if (!flag)
	{
		printf("aggiunta\n");
		return 1;
	}
	printf("aggiunta\n");
	return 1;
}
stazione *successore(stazione *cursore)
{
	cursore = cursore->destra;
	while (cursore->sinistra != NULL)
	{
		cursore = cursore->sinistra;
	}
	if (cursore->destra == NULL && cursore->sinistra == NULL)
	{
		if (cursore == cursore->padre->destra)
		{
			cursore->padre->destra = NULL;
		}
		else
		{
			cursore->padre->sinistra = NULL;
		}
	}
	else if (cursore->sinistra == NULL)
	{
		if (cursore == cursore->padre->destra)
		{
			cursore->padre->destra = cursore->destra;
			cursore->destra->padre = cursore->padre;
		}
		else
		{
			cursore->padre->sinistra = cursore->destra;
			cursore->destra->padre = cursore->padre;
		}
	}
	else if (cursore->destra == NULL)
	{
		if (cursore == cursore->padre->destra)
		{
			cursore->padre->destra = cursore->sinistra;
			cursore->sinistra->padre = cursore->padre;
		}
		else
		{
			cursore->padre->sinistra = cursore->sinistra;
			cursore->sinistra->padre = cursore->padre;
		}
	}
	return cursore;
}
int demolisci_stazione(stazione **autostrada, int numero_stazioni, int key)
{
	stazione *cursore = *autostrada;
	stazione *temp;
	if (cursore == NULL)
	{
		// l'autostrada è vuota
		return 0;
	}
	while (((key > cursore->distanza && cursore->destra != NULL) || (key < cursore->distanza && cursore->sinistra)) && (key != cursore->distanza))
	{
		if (key > cursore->distanza)
		{
			cursore = cursore->destra;
		}
		else
		{
			cursore = cursore->sinistra;
		}
	}
	if (key == cursore->distanza)
	{
		// trovata, devo cancellarla

		if (cursore->destra == NULL && cursore->sinistra == NULL)
		{
			if (cursore == *autostrada)
			{
				*autostrada = NULL;
				cursore = NULL;
			}
			else if (cursore == cursore->padre->destra)
			{
				cursore->padre->destra = NULL;
				cursore = NULL;
			}
			else
			{
				cursore->padre->sinistra = NULL;
				cursore = NULL;
			}
			printf("demolita\n");
			return 1;
		}
		else if (cursore->sinistra == NULL)
		{
			if (cursore == *autostrada)
			{
				cursore->destra->padre = NULL;
				*autostrada = cursore->destra;
				cursore = NULL;
			}
			else if (cursore == cursore->padre->destra)
			{
				cursore->padre->destra = cursore->destra;
				cursore->destra->padre = cursore->padre;
				cursore = NULL;
			}
			else
			{
				cursore->padre->sinistra = cursore->destra;
				cursore->destra->padre = cursore->padre;
				cursore = NULL;
			}
		}
		else if (cursore->destra == NULL)
		{
			if (cursore == *autostrada)
			{
				cursore->sinistra->padre = NULL;
				*autostrada = cursore->sinistra;
				cursore = NULL;
			}
			else if (cursore == cursore->padre->destra)
			{
				cursore->padre->destra = cursore->sinistra;
				cursore->sinistra->padre = cursore->padre;
				cursore = NULL;
			}
			else
			{
				cursore->padre->sinistra = cursore->sinistra;
				cursore->sinistra->padre = cursore->padre;
				cursore = NULL;
			}
		}
		else
		{
			temp = successore(cursore);
			if (cursore == *autostrada)
			{
				temp->destra = cursore->destra;
				temp->sinistra = cursore->sinistra;
				temp->padre = NULL;
				if (temp->destra != NULL)
				{
					temp->destra->padre = temp;
				}
				if (temp->sinistra != NULL)
				{
					temp->sinistra->padre = temp;
				}
				*autostrada = temp;
			}
			else if (cursore == cursore->padre->destra)
			{
				temp->destra = cursore->destra;
				temp->sinistra = cursore->sinistra;
				temp->padre = cursore->padre;
				if (temp->destra != NULL)
				{
					temp->destra->padre = temp;
				}
				if (temp->sinistra != NULL)
				{
					temp->sinistra->padre = temp;
				}
				cursore->padre->destra = temp;
			}
			else
			{
				temp->destra = cursore->destra;
				temp->sinistra = cursore->sinistra;
				temp->padre = cursore->padre;
				if (temp->destra != NULL)
				{
					temp->destra->padre = temp;
				}
				if (temp->sinistra != NULL)
				{
					temp->sinistra->padre = temp;
				}
				cursore->padre->sinistra = temp;
			}
			cursore = NULL;
		}
		printf("demolita\n");
		return 1;
	}
	return 0;
}
int aggiungi_auto(stazione *autostrada, int numero_stazioni) // TODO se aggiungo auto a un parco vuoto il puntatore associato alla lista della stazione in cui ho aggiunto sballa
{
	int distanza, autonomia, flag = 1;
	// int k = 0, flag = 1, cercato ;
	if (scanf("%d", &distanza) == 1)
		; // leggo la distanza della stazione dall'inizio dell'autostrada
	if (scanf("%d", &autonomia) == 1)
		; // leggo l'autonomia del veicolo da aggiungere
	stazione *cursore = autostrada;
	while (((distanza > cursore->distanza && cursore->destra != NULL) || (distanza < cursore->distanza && cursore->sinistra)) && (distanza != cursore->distanza))
	{
		if (distanza > cursore->distanza)
		{
			cursore = cursore->destra;
		}
		else
		{
			cursore = cursore->sinistra;
		}
	}
	if (distanza == cursore->distanza)
	{
		// ho trovato la stazione dove aggiungere l'auto
		// se la nuova autonomia e' la massima della stazione allora devo anche aggiornare gli archi, altrimenti devo solo mantenere il vettore in ordine
		if (cursore->n_veicoli == 512)
		{
			printf("non aggiunta\n"); // parco veicoli pieno
			return 0;
		}
		cursore->n_veicoli += 1;
		lista_auto *nuova_macchina;
		lista_auto *cursor = cursore->testa_parco_veicoli;
		if (cursor == NULL)
		{
			nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
			nuova_macchina->km = autonomia;
			nuova_macchina->prec = NULL;
			nuova_macchina->next = NULL;
			cursore->testa_parco_veicoli = nuova_macchina;
			flag = 0;
		}
		while (flag && cursor->next != NULL && autonomia <= cursor->km)
		{
			cursor = cursor->next;
		}

		// in cursor c'è la macchina a cui devo attaccare la nuova
		if (flag && cursor->prec == NULL && cursor->next == NULL)
		{
			// in testa e c'è solo lei
			if (autonomia <= cursor->km)
			{
				// devo attaccarlo dopo
				nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
				nuova_macchina->km = autonomia;
				nuova_macchina->prec = cursor;
				nuova_macchina->next = NULL;
				cursor->next = nuova_macchina;
			}
			else
			{
				// devo attaccarlo prima
				nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
				nuova_macchina->km = autonomia;
				nuova_macchina->prec = NULL;
				nuova_macchina->next = cursor;
				cursor->prec = nuova_macchina;
				cursore->testa_parco_veicoli = nuova_macchina;
			}
		}
		else if (flag && cursor->prec == NULL)
		{
			// in testa non da solo
			nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
			nuova_macchina->km = autonomia;
			nuova_macchina->next = cursor;
			nuova_macchina->prec = cursor->prec;
			cursor->prec = nuova_macchina;
			cursore->testa_parco_veicoli = nuova_macchina;
		}
		else if (flag && cursor->next == NULL)
		{
			// sono in coda
			if (autonomia <= cursor->km)
			{
				// devo collegarlo dopo
				nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
				nuova_macchina->km = autonomia;
				nuova_macchina->prec = cursor;
				nuova_macchina->next = NULL;
				cursor->next = nuova_macchina;
			}
			else
			{
				// devo collegarlo prima
				nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
				nuova_macchina->km = autonomia;
				nuova_macchina->prec = cursor->prec;
				nuova_macchina->next = cursor;
				cursor->prec->next = nuova_macchina;
				cursor->prec = nuova_macchina;
				cursor->next = NULL;
			}
		}
		else if (flag)
		{
			// sono in mezzo
			nuova_macchina = (lista_auto *)calloc(1, sizeof(lista_auto));
			nuova_macchina->km = autonomia;
			nuova_macchina->next = cursor;
			nuova_macchina->prec = cursor->prec;
			cursor->prec->next = nuova_macchina;
			cursor->prec = nuova_macchina;
		}
		printf("aggiunta\n");
		return 1;
	}

	printf("non aggiunta\n"); // non esiste stazione
	return 0;
}
void rottama_auto(stazione *autostrada, int numero_stazioni) // TODO mi da problemi controlla elimina_archi_dopo_rottama
{
	int distanza, autonomia, flag = 1;
	stazione *cursore = autostrada;
	if (scanf("%d", &distanza) == 1)
		; // in distanza c'è il codice della stazione in cui eliminare l'auto
	if (scanf("%d", &autonomia) == 1)
		; // in autonomia l'autonomia della macchina da rottamare
	while (((distanza > cursore->distanza && cursore->destra != NULL) || (distanza < cursore->distanza && cursore->sinistra)) && (distanza != cursore->distanza))
	{
		if (distanza > cursore->distanza)
		{
			cursore = cursore->destra;
		}
		else
		{
			cursore = cursore->sinistra;
		}
	}
	if (cursore->distanza == distanza)
	{
		// ho trovato la stazione in cui devo rottamare l'auto, ora dobbiamo trovare l'auto
		lista_auto *cursor = cursore->testa_parco_veicoli;
		while (flag && cursor != NULL)
		{
			if (autonomia > cursor->km)
			{
				flag = 0;
			}
			if (flag && autonomia == cursor->km)
			{
				// ho trovato la macchina all'interno della stazione devo differenziare dov'è
				cursore->n_veicoli--;
				if (cursor->prec == NULL && cursor->next == NULL)
				{
					cursore->testa_parco_veicoli = cursor->next;
					cursor = NULL;
				}
				else if (cursor->prec == NULL)
				{
					cursore->testa_parco_veicoli = cursor->next;
					cursor->next->prec = NULL;
					cursor = NULL;
				}
				else if (cursor->next == NULL)
				{
					cursor->prec->next = NULL;
					cursor = NULL;
				}
				else
				{
					cursor->prec->next = cursor->next;
					cursor->next->prec = cursor->prec;
					cursor = NULL;
				}
				printf("rottamata\n");
				return;
			}
			cursor = cursor->next;
		}

		printf("non rottamata\n"); // non esiste nessun'auto con quella autonomia nella stazione richiesta
		return;
	}

	printf("non rottamata\n"); // non esiste nessuna stazione con quel chilometraggio
	return;
}

typedef struct
{
	int partenza;
	int arrivo;
} risposta;

risposta imposta_indici(struttura **insieme, int keypartenza, int keyarrivo, int numero_stazioni)
{
	int i = 0;
	risposta ris;
	for (i = 0; i < numero_stazioni; i++)
	{
		insieme[i]->dist_arr = 100000000;
		if (insieme[i]->dist == keyarrivo)
		{
			ris.arrivo = i;
		}
		else if (insieme[i]->dist == keypartenza)
		{
			ris.partenza = i;
		}
	}
	return ris;
}
int *calcola_distanza_successivi(struttura **insieme, int indice_partenza, int indice_arrivo)
{
	int i = 0;
	// cerca di farlo senza struttura ausiliaria...
	int k = indice_partenza;
	int controllo = k - 1;
	insieme[indice_partenza]->dist_arr = 0;
	while (k != indice_arrivo)
	{
		if (controllo != indice_arrivo - 1 && insieme[k]->dist - insieme[k]->macchina <= insieme[controllo]->dist)
		{
			if (insieme[k]->dist_arr + 1 <= insieme[controllo]->dist_arr)
			{
				insieme[controllo]->dist_arr = insieme[k]->dist_arr + 1;
				insieme[controllo]->index_next_station = k;
			}
			controllo--;
		}
		else
		{
			k--;
			if (insieme[k]->dist_arr <= insieme[k + 1]->dist_arr)
			{
				controllo = k - 1;
			}
		}
	}
	int *percorso;
	k = indice_arrivo;
	int lenght = insieme[k]->dist_arr + 1;
	i = insieme[k]->dist_arr;
	if (insieme[k]->dist_arr > indice_partenza - indice_arrivo)
	{
		percorso = (int *)malloc(sizeof(int) * 1);
		printf("nessun percorso\n");
		percorso[0] = -1;
		return percorso;
	}
	percorso = (int *)malloc(sizeof(int) * (lenght + 1));
	while (k != indice_partenza)
	{
		percorso[i] = insieme[k]->dist;
		k = insieme[k]->index_next_station;
		i--;
	}
	percorso[0] = insieme[k]->dist;
	percorso[lenght] = -1;
	return percorso;
}
int *calcola_distanza_precedenti(struttura **insieme, int indice_partenza, int indice_arrivo)
{
	int min = indice_arrivo + 1;
	int i = 0;
	int flag = 1;
	insieme[indice_arrivo]->dist_arr = 0;
	int k = indice_arrivo;
	int *distanze;
	distanze = (int *)calloc(indice_arrivo - indice_partenza + 1, sizeof(int));
	distanze[0] = insieme[indice_arrivo]->dist;
	k--;
	while (k >= indice_partenza)
	{
		insieme[k]->dist_arr = min;
		flag = 1;
		i = 0;
		while (flag && distanze[i] != 0)
		{
			if (insieme[k]->dist + insieme[k]->macchina >= distanze[i])
			{
				distanze[i + 1] = insieme[k]->dist;
				flag = 0;
				insieme[k]->dist_arr = i + 1;
			}
			i++;
		}
		k--;
	}
	int *percorso;

	k = indice_partenza;
	if (insieme[k]->dist_arr >= min)
	{
		printf("nessun percorso\n");
		percorso = (int *)malloc(sizeof(int));
		percorso[0] = -1;
		return percorso;
	}
	int lenght = insieme[indice_partenza]->dist_arr + 1;
	percorso = (int *)malloc(sizeof(int) * (lenght + 1));
	i = insieme[k]->dist_arr;
	int j = 0;
	while (i >= 0)
	{
		percorso[j] = distanze[i];
		i--;
		j++; // devo studiare il caso in cui non si arriva a target perchè il percorso non c'è
	}
	percorso[j] = -1;
	return percorso;
}
int *pianifica_percorso(struttura **insieme, int keypartenza, int keyarrivo, int numero_stazioni)
{

	risposta partarriv;

	partarriv = imposta_indici(insieme, keypartenza, keyarrivo, numero_stazioni);

	int *totale;
	if (partarriv.arrivo == partarriv.partenza)
	{
		// arrivo e partenza coincidono!
		totale = (int *)malloc(sizeof(int) * 2);
		totale[0] = insieme[partarriv.partenza]->dist;
		totale[1] = -1;
		return totale;
	}
	else if (insieme[partarriv.arrivo]->dist < insieme[partarriv.partenza]->dist)
	{
		totale = calcola_distanza_successivi(insieme, partarriv.partenza, partarriv.arrivo);
	}
	else
	{
		totale = calcola_distanza_precedenti(insieme, partarriv.partenza, partarriv.arrivo);
	}

	return totale;
}

int w = 0;
void costruisci(stazione *cursore, struttura **temp)
{
	if (cursore != NULL)
	{
		costruisci(cursore->sinistra, temp);
		// printf("%d->", cursore->distanza);
		temp[w] = (struttura *)calloc(1, sizeof(struttura));
		temp[w]->dist = cursore->distanza;
		if (cursore->testa_parco_veicoli != NULL)
		{
			temp[w]->macchina = cursore->testa_parco_veicoli->km;
		}
		else
		{
			temp[w]->macchina = 0;
		}
		w++;
		costruisci(cursore->destra, temp);
	}
	return;
}
int main(int argc, char *argv[])
{
	int key = 0;
	int numero_stazioni = 0;
	char input[30];
	stazione *autostrada = NULL, *nuova_stazione;
	int *ris;
	int c = 0;
	int partenza, arrivo;
	while (!feof(stdin))
	{
		if (scanf("%s", input) == 1)
			;
		if (strcmp(input, "aggiungi-stazione") == 0)
		{
			nuova_stazione = (stazione *)calloc(1, sizeof(stazione));
			if (aggiungi_stazione(&autostrada, numero_stazioni, nuova_stazione))
			{
				numero_stazioni++;
				// printf("%d\n", numero_stazioni);
			}
		}
		else if (strcmp(input, "demolisci-stazione") == 0)
		{
			if (scanf("%d", &key) == 1)
				;

			if (demolisci_stazione(&autostrada, numero_stazioni, key) == 1)
			{
				// stazione trovata e demolita
				numero_stazioni--;
				// printf("%d\n", numero_stazioni);
			}
			else
			{
				printf("non demolita\n");
				// printf("%d\n", numero_stazioni);
			}
		}
		else if (strcmp(input, "aggiungi-auto") == 0)
		{
			aggiungi_auto(autostrada, numero_stazioni);
		}
		else if (strcmp(input, "rottama-auto") == 0)
		{
			rottama_auto(autostrada, numero_stazioni);
		}
		else if (strcmp(input, "pianifica-percorso") == 0)
		{
			struttura **insieme;
			insieme = (struttura **)calloc(numero_stazioni, sizeof(struttura *));
			stazione *cursore = autostrada;
			w = 0;
			costruisci(cursore, insieme);
			c = 0;
			if (scanf("%d %d", &partenza, &arrivo) == 2)
				;

			ris = pianifica_percorso(insieme, partenza, arrivo, numero_stazioni);
			while (ris[c] != -1)
			{
				if (ris[c + 1] == -1)
				{
					printf("%d\n", ris[c]);
				}
				else
					printf("%d ", ris[c]);
				c++;
			}
			insieme = NULL;
		}

		input[0] = 'l';
	}
	return 0;
}
