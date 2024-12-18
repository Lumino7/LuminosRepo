SELECT AVG(energy) FROM songs WHERE artist_id = (SELECT id FROM artists WHERE name = "Drake")

--Can use = here because there is only one id for name Drake.