-- In 7.sql, write a SQL query to list all movies released in 2010 and their ratings, in descending order by rating. For movies with the same rating, order them alphabetically by title
--Your query should output a table with two columns, one for the title of each movie and one for the rating of each movie.
--Movies that do not have ratings should not be included in the result.


SELECT movies.title, ratings.rating FROM movies INNER JOIN ratings ON id = movie_id WHERE year = "2010" ORDER BY rating DESC, title ASC

--SELECT *2 rows that you want to combine* FROM *table with primary key* INNER JOIN *subtable* ON *common columns*.... ORDER BY *main sorting condition*, *secondary sorting condition if many
--rows have the same condition*