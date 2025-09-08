#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>
#include <stdbool.h>
typedef struct {
    char name[300][200];
    char email[300][300];
   // int accountnumber[300];
    char password[300][200];
    int money[300];
}account;

// GLOBAL VARIABLES //

bool loginin = false;
account acc;
int saved;

// FUNCTIONS //

void createAccount();
void deposit();
void loginAccount();
void withdraw();
void checkaccount();
int emailverify(char name[300]);
void initialvariables(){
    acc.name[300][200] = '\0';
    acc.money[200] = 0;
    acc.email[300][300] = '\0';
    acc.password[300][200] = '\0';

}
int main(){
    int choice;
    void initialvariables();

do {

    if(loginin == true){
        printf("3. Deposit\n");
        printf("4. Withdraw\n");
        printf("5. Transfer\n");
        printf("6. Check Balance\n");
    }
    else{
        printf("1. Create Account\n");
    printf("2. Login Account\n");
    }
    printf("7. Exit\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);

    switch(choice) {
        case 1: createAccount(); break;
        case 2: loginAccount();break;
        case 3:deposit();break;
        case 4:withdraw();break;
        case 6:checkaccount();break;
        default:printf("UNVALIDE CHOIX\n");break;
    }
} while(choice != 7);

}


void createAccount(){

    for(int i = 0 ; i < 200; i++){
        char newemail[300];
        if(strcmp(acc.name[i],"\0") ==0){
            getchar();
            printf("Enter your name: ");
            fgets(acc.name[i],sizeof(acc.name[i]),stdin);

            do{
                printf("Enter your email: ");
                fgets(newemail,sizeof(newemail),stdin);
                emailverify(newemail);

            }while(emailverify(newemail) == 1);
            
            
            printf("Enter your password: ");
            fgets(acc.password[i],sizeof(acc.password[i]),stdin);
            acc.money[i] = 0;
            system("cls");
            printf("=========== ACCOUNT CREATED ===========\n");
            printf("FULLNAME:%s\nEMAIL:%s\nBallance:%d\n",acc.name[i],acc.email[i],acc.money[i]);
            printf("=========== ACCOUNT CREATED ===========\n\n");

            break;
        }
        else{
            continue;
        }
    }
}


void loginAccount(){
    system("cls");
    char emailrequest[300];
    char password[300];
    getchar();
    printf("Enter your email: ");
    fgets(emailrequest,sizeof(emailrequest),stdin);
    printf("Enter your password: ");
    fgets(password,sizeof(password),stdin);

    for(int i = 0 ; i < 200;i++){
        if(strcmp(emailrequest,acc.email[i]) == 0 && strcmp(password,acc.password[i]) == 0){
            printf("Welcome Back %s\n",acc.name[i]);
            loginin = true;
            saved = i;
            break;

        }
        else{
            continue;
        }
    }
}
void deposit(){
    int newmoney;
    char password[200];
    printf("How much you want to deposit : ");
    getchar();
    scanf(" %d",&newmoney);
    getchar();
    printf("For Security Puposes\nWe request you to reenter your Password : ");
    fgets(password,sizeof(password),stdin);
    if(strcmp(password,acc.password[saved]) == 0){
            acc.money[saved] += newmoney;
        printf("%d Added Successfully\n",newmoney);
    }
    else{
        printf("You got it wrong\nGoing to Logout\n");
        printf("You Got LOGGED OUT\n");
        loginin = false;
        main();
    }

}

void checkaccount(){
    printf("you have $%d\n",acc.money[saved]);
}

void withdraw(){
    int newmoney;
    char password[200];
    printf("How much you want to withdraw : ");
    getchar();
    scanf(" %d",&newmoney);
    getchar();
    printf("For Security Puposes\nWe request you to reenter your Password : ");
    fgets(password,sizeof(password),stdin);
    if(strcmp(password,acc.password[saved]) == 0){
            if(acc.money[saved] >= newmoney){
                    acc.money[saved] -= newmoney;
            }
            else{
                printf("insufficient Amount\n");
            }
    }
    else{
                printf("You got it wrong\nGoing to Logout\n");

        printf("You Got LOGGED OUT\n");
        loginin = false;
        main();
    }

}


int emailverify(char email[300]){
    for(int i = 0 ; i < 200 ; i++){
        if(strcmp(email,acc.email[i]) == 0){
            printf("Already Found Email\n");
            return 1;
        }
        else{
            printf("Account NOT FOUND\n");
            return 0;
        }
    }
}