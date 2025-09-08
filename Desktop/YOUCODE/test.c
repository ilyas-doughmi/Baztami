#include<stdio.h>

int  strcmp_fc(char s1[], char s2[])
{
    int i = 0;
    while(s1[i] != '\0' || s2[i] != '\0')
    {
        if (s1[i] != s2[i])
        {
            return 1;
        }
        i++;
    }

    return 0;
    
}

int main ()
{
    char d1[5] = "ham";
    char d2[5] = "hamz";
    printf(" %d", strcmp_fc(d1,d2));

}