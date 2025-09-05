#include <stdio.h>
#include <string.h>

int main(){
    int array[4] = {1,2,3,4};
    int i = 0;
    int last = 0;
    int array2[4];  
    int count = 0;

    for(i = 0;i < 4 ; i++){
        if(last == i){
            printf("rah drt continue %d %d\n",i,last);
            last++;
            continue;
        }
        else{
            printf("Madrtch continue f %d %d\n",i,last);
            count++;
            last++;

        }
    }

    printf("\ncount: %d",count);
}