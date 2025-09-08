#include <stdio.h>
#include <stdlib.h>
typedef struct{
    char name[300][300];
    char email[300][300];
    char sname[300][300];
    char status[20][300];
    char phonenumber[100][300];
    char city[100][300];
}st;

st student;
void addstudent();
void seeallstudents();
int strcmpp(char str1[],char str2[]);

int strlenn(char str1[]);
void setupvariables(){
    student.name[300][300] = '\0';
    student.email[300][300] = '\0';
    student.sname[300][300] = '\0';
    student.status[300][300] = '\0';
    student.phonenumber[100][300] = '\0';
    student.city[100][300] = '\0';
}

int main(){
    //setupvariables();

    int choix;
    do{
        printf("1.Add Student\n2.See All Students\n3.Search Student\n4.Modifie Student\n5.Delete Student\n0.Quit\nChoose : ");
        scanf("%d",&choix);
        
        switch(choix){
            case 1:addstudent();break;
            case 2:seeallstudents();
            case 0:printf("Quit\n");break;
            default:printf("Unvalide Choice\n");break;
        }
    }while(choix != 0);
}

 void addstudent(){
     for(int i = 0 ; i < 300 ; i++){
        
         if(student.name[i] != "\0"){
            printf("Enter a Full Name for Student:  ");
            getchar();
            fgets(student.name[i],sizeof(student.name[i]),stdin);
            printf("Enter a Email for Student:  ");
            fgets(student.email[i],sizeof(student.email[i]),stdin);
            printf("Enter a Staff Name : ");
             fgets(student.sname[i],sizeof(student.sname[i]),stdin);
            printf("Enter a status  : ");
             fgets(student.status[i],sizeof(student.status[i]),stdin);
            printf("Enter a phonenumber : ");
             fgets(student.phonenumber[i],sizeof(student.phonenumber[i]),stdin);
            printf("Enter a student city : ");
             fgets(student.city[i],sizeof(student.city[i]),stdin);
            system("cls");
            printf("=============== STUDENT ADDED ==================\nFULL NAME : %s\nEmail : %s\nStaff : %s\nStatus: %s\nPhone Number: %s\nCity: %s\n",student.name[i],student.email[i],student.sname[i],student.status[i],student.phonenumber[i],student.city[i]);
             break;

         }
         else{
             printf("Not Found\n");
         }
     }
 }
 void seeallstudents(){
    char teacher[100];
    getchar();
    printf("name of teacher : ");
    fgets(teacher,sizeof(teacher),stdin);   
    
    for(int i = 0 ; i < 100; i++){
        if(strcmpp(teacher,student.name[i]) == 0){
            printf("%s -- ",student.name[i]);
        }
        else{
            break;
        }
    }
}
// FUNCTIONS NEEDED LIKE STRLENN + STRCMP
int strlenn(char str1[]){
    int i = 0;
    while(str1[i] != '\0'){
        i++;
    }
    str1[i] = '\0';
    return i;
}
int strcmpp(char str1[],char str2[]){
    int i = 0;
     while(str1[i] !='\0' && str2[i] !='\0'){
            if(str1[i] == str2[i]){
                i++;
            }
            else{
                return 1;
            }
        }

        return 0;
}
