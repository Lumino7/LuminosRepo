#include "helpers.h"
#include "math.h"
#include "string.h"

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            float x = image[i][j].rgbtBlue + image[i][j].rgbtGreen + image[i][j].rgbtRed;
            int g = round(x / 3);
            image[i][j].rgbtBlue = g;
            image[i][j].rgbtGreen = g;
            image[i][j].rgbtRed = g;
        }
    }

    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            float sRed = (.393 * image[i][j].rgbtRed) + (.769 * image[i][j].rgbtGreen) + (.189 * image[i][j].rgbtBlue);

            if (sRed > 255)
            {
                sRed = 255;
            }

            float sGreen = (.349 * image[i][j].rgbtRed) + (.686 * image[i][j].rgbtGreen) + (.168 * image[i][j].rgbtBlue);

            if (sGreen > 255)
            {
                sGreen = 255;
            }

            float sBlue = (.272 * image[i][j].rgbtRed) + (.534 * image[i][j].rgbtGreen) + (.131 * image[i][j].rgbtBlue);

            if (sBlue > 255)
            {
                sBlue = 255;
            }

            image[i][j].rgbtRed = round(sRed);
            image[i][j].rgbtGreen = round(sGreen);
            image[i][j].rgbtBlue = round(sBlue);
        }
    }

    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{

    int lastIndex;
    if (width % 2 == 0)
    {
        // Even
        lastIndex = width / 2;
    }
    else
    {
        // Odd
        lastIndex = ((width - 1) / 2);
    }

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < lastIndex; j++)
        {
            RGBTRIPLE tmp = image[i][j];
            image[i][j] = image[i][(width - 1) - j];
            image[i][(width - 1) - j] = tmp;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE copy[height][width];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            copy[i][j] = image[i][j];
        }
    }

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // PIXEL
            int pixelCount = 0;
            float redTotal = 0;
            float blueTotal = 0;
            float greenTotal = 0;

            for (int k = (i - 1); k <= (i + 1);  k++)
            {
                if (k < 0 || k >= height)
                {
                    continue;
                }

                for (int l = (j - 1); l <= (j + 1);  l++)
                {
                    if (l < 0 || l >= width)
                    {
                        continue;
                    }

                    pixelCount++;

                    redTotal += copy[k][l].rgbtRed;
                    greenTotal += copy[k][l].rgbtGreen;
                    blueTotal += copy[k][l].rgbtBlue;
                }
            }

            image[i][j].rgbtRed = round(redTotal / pixelCount);
            image[i][j].rgbtGreen = round(greenTotal / pixelCount);
            image[i][j].rgbtBlue = round(blueTotal / pixelCount);
        }
    }

    return;
}
