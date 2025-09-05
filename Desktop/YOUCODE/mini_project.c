#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <stdlib.h>

char booksname[100][50] = {"\0"};
char booksauth[100][50] = {"\0"};
float bookprice[100] = {0};
int bookquantite[100] = {0};
bool found = false;
int globalstorage = 0;
int oldstorage;
void ajouter();
void show();
void miseajour();
//void booksearch();
void retour();
void bookdelete();
void fullstorage();
int main() {
    int choix = -1;

    do {
        system("cls"); 
        printf("======== BOOK LIBRARY =========\n");
        printf("1. Ajouter un livre au stock\n");
        printf("2. Afficher tous les livres disponibles\n");
        printf("3. Rechercher un livre par son titre\n");
        printf("4. Mettre à jour la quantité d'un livre\n");
        printf("5. Supprimer un livre du stock (à ajouter)\n");
        printf("6. SHOW FULL STORAGE\n");
        printf("0. Quitter\n");
        printf("================================\n");
        printf("Choose: ");
        scanf(" %d", &choix);
        getchar(); 

        switch (choix) {
            case 1: ajouter(); break;
            case 2: show(); break;
            //case 3: booksearch(); break;
            case 4: miseajour(); break;
            case 5: bookdelete();break;
            case 6:fullstorage();break;
            case 0: 
                system("cls");
                printf("Bye \n"); 
                break;
            default: 
                printf("Choix invalide !\n"); 
        }
    } while (choix != 0);

    return 0;
}

void ajouter() {
    system("cls");
    for (int i = 0; i < 100; i++) {
        if (booksname[i][0] == '\0') {
            printf("======== ADD NEW BOOK ==========\n");
            printf("Enter Book Name : ");
            fgets(booksname[i], sizeof(booksname[i]), stdin);
            booksname[i][strlen(booksname[i]) - 1] = '\0';

            printf("Enter Author Name: ");
            fgets(booksauth[i], sizeof(booksauth[i]), stdin);
            booksauth[i][strlen(booksauth[i]) - 1] = '\0';

            printf("Enter Price: ");
            scanf(" %f", &bookprice[i]);

            printf("Enter Quantity: ");
            scanf(" %d", &bookquantite[i]);
            getchar();
            globalstorage += bookquantite[i];

            system("cls");
            printf("============== BOOK CREATED SUCCESSFULLY ================\n");
            printf("TITLE   : %s\nAUTHOR  : %s\nPRICE   : $%.2f\nQUANTITY: %d\n\n",
                   booksname[i], booksauth[i], bookprice[i], bookquantite[i]);
            retour();
            return;
        }
    }
    printf("No more space for new books!\n");
    retour();
}

void show() {
    system("cls");
    found = false;

    for (int i = 0; i < 100; i++) {
        if (booksname[i][0] != '\0') {
            printf("===== BOOK FOUND ======\n");
            printf("TITLE   : %s\nAUTHOR  : %s\nPRICE   : $%.2f\nQUANTITY: %d\n=======================\n\n",
                   booksname[i], booksauth[i], bookprice[i], bookquantite[i]);
            found = true;
        }
    }
    if (!found) {
        printf("\nThere is no book in library.\nGo and create one!\n\n");
    }
    retour();
}



void miseajour() {
    system("cls");
    char bookrequest[100];
    printf("Enter the book you want: ");
    fgets(bookrequest, sizeof(bookrequest), stdin);
    bookrequest[strlen(bookrequest) - 1] = '\0'; 

    for (int i = 0; i < 100; i++) {
        if (strcmp(booksname[i], bookrequest) == 0) {
            printf("\n====== BOOK FOUND =======\n");
            printf("TITLE   : %s\nAUTHOR  : %s\nPRICE   : $%.2f\nQUANTITY: %d\n",
                   booksname[i], booksauth[i], bookprice[i], bookquantite[i]);

            printf("\nEnter new quantity: ");
            oldstorage = bookquantite[i];
            scanf(" %d", &bookquantite[i]);
            getchar();
            globalstorage += bookquantite[i] - oldstorage;


            printf("Quantity updated successfully!\n");
            found = true;
            break;
        }
    }
    if (!found) {
        printf("\nBook NOT FOUND IN OUR LIBRARY\n");
    }
    retour();
}

void retour() {
    int choix;
    do {
        printf("\n1. Retourner au menu principal\n0. Quitter\nChoose: ");
        scanf("%d", &choix);
        getchar();
        if (choix == 0) {
            system("cls");
            printf("Bye\n");
            exit(0);
        } else if (choix == 1) {
            main();
            return;
        } else {
            printf("Invalid choice!\n");
        }
    } while (choix != 1 && choix != 0);
}


void bookdelete(){
    char bookrequest[100];
    printf("Enter Book Title you want to delete : ");
    fgets(bookrequest,sizeof(bookrequest),stdin);
    bookrequest[strlen(bookrequest) - 1] = '\0';

    for(int i = 0 ; i < 100; i++ ){
        if (strcmp(bookrequest,booksname[i]) == 0) {
            printf("Found\n");
            found = true;
            strcpy(booksname[i],"\0");
            printf("DELETE SUCCESSFULLY\n");
    }
    if(!found){
        printf("NO BOOK FOUND WITH %s name\n",bookrequest);
    }
    retour();
}
}

void fullstorage(){
    printf("All Books are %d",globalstorage);
    retour();
}