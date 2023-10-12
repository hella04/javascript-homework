#include <stdio.h>
// #include <libchess/epd.h>
// #include <libchess/movegen.h>
fen= [r,1,b,k,3,r];

 int Position (pos){
    if (parse_fen(&pos, fen) != 0) {
        printf("Hibás FEN kód.\n");
        return 1;
    }
 }


int main() {
    char fen[100];
    printf("Adja meg a sakk FEN kódot: ");
    fgets(fen, sizeof(fen), stdin);

   

    MoveList moves;
    generate_moves(&pos, &moves);

    printf("Lehetséges lépések:\n");
    for (int i = 0; i < moves.size; i++) {
        char move_str[10];
        move_to_san(&pos, &moves.moves[i], move_str);
        printf("%s\n", move_str);
    }

    return 0;
}
