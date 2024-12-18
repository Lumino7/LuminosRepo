SELECT AVG (rating) FROM ratings WHERE movie_id IN (SELECT id FROM movies WHERE year = "2012")

--Use IN because there are mulitple id's with year 2012.