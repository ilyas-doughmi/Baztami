#include<stdio.h>
void majiscule(){
    char x[200] ="hello world";
    int i =0;
    while(x[i] != '\0'){
        if(x[i] == ' '){
            printf(" ");
            i++;
        }else {
            printf("%c",x[i] - 32);
            i++;
        }
    }
}
void miniscule(char x[]){
    
    int i =0;
    while(x[i] != '\0'){
        if(x[i] == ' '){
            printf(" ");
            i++;
        }else {
            printf("%c",x[i] + 32);
            i++;
        }
    }
}
int main()
{
    char x[200];
    printf("text : ");
    fgets(x,sizeof(x),stdin);
    miniscule(x);
    return 0;
}