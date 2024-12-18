#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>

typedef uint8_t BYTE;
int BLOCKSIZE = sizeof(BYTE) * 512;

bool hasJpegHeader(BYTE buffer[BLOCKSIZE]);

int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        printf("Usage: No File Name\n");
        return 1;
    }

    // read file
    FILE *file = fopen(argv[1], "r"); //fopen 1st argument is the pathname.
    FILE *image = NULL; //creates/declares image file for output

    if (file == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    BYTE buffer[BLOCKSIZE];
    int image_count = 0;
    char filename[8]; //is this how you declare a string?

    while (fread(buffer, 1, BLOCKSIZE, file) == BLOCKSIZE) //read from "file" 1byte, BLOCKSIZE times, into "buffer".
    {
        if (hasJpegHeader(buffer))
        {
            if (image_count == 0)
            {
                sprintf(filename, "%03i.jpg", image_count);

                image = fopen(filename, "w");

                fwrite(buffer, 1, BLOCKSIZE, image); //write into "image" 1byte, BLOCKSIZE times, from "buffer".

                image_count++;
            }

            else
            {
                fclose(image);

                sprintf(filename, "%03i.jpg", image_count);

                image = fopen(filename, "w");

                fwrite(buffer, 1, BLOCKSIZE, image);

                image_count++;
            }
        }

        else
        {
            if (image_count > 0)
            {
                fwrite(buffer, 1, BLOCKSIZE, image);
            }
        }
    }

    fclose(file);
    fclose(image); //had to close image here to stop memory leak
}

bool hasJpegHeader(BYTE buffer[BLOCKSIZE])
{
    if
    (
        buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0
    ) //won't accept multiple lines
    {
        return true;
    }

    else
    {
        return false;
    }
}
