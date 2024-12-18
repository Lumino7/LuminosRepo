-- Keep a log of any SQL queries you execute as you solve the mystery.

SELECT * FROM crime_scene_reports WHERE month = "07" AND day = "28"; --to search initial details about the crime. Result: Humphrey Street Bakery, 1015AM.
SELECT * FROM interviews WHERE month = "7" and day = "28"; --to get more details. Thief out of bakery around 1025. Before he arrived at the bakery, Eugene saw the thief withdrawing money from
--ATM on Leggett Street
--Earliest flight on 29th (phone call).
SELECT * FROM airports WHERE city LIKE "fiftyville" --to see airport ID. =8
SELECT * FROM flights WHERE day = "29" AND month = "7" ORDER BY hour ASC; --Search for earliest flight. =36. Destination id: 4.
SELECT * FROM airports WHERE id = "4" --New York City

SELECT name FROM people
    WHERE id IN (SELECT person_id FROM bank_accounts WHERE account_number IN
        (SELECT account_number FROM atm_transactions WHERE month = "7" AND day = "28" AND atm_location = "Leggett Street" AND transaction_type = "withdraw"))
    AND license_plate IN (SELECT license_plate FROM bakery_security_logs WHERE month = "7" AND day = "28" AND hour = "10" AND activity = "exit" AND minute < 25)
    AND phone_number IN (SELECT caller FROM phone_calls WHERE month = "7" AND day = "28" AND duration < 60)
    AND passport_number IN (SELECT passport_number FROM passengers WHERE flight_id = "36") -- thief: Bruce

SELECT name FROM people
    WHERE phone_number IN (SELECT receiver FROM phone_calls WHERE month = "7" AND day = "28" AND duration < 60 AND caller =
        (SELECT phone_number FROM people WHERE name = "Bruce")) -- Accomplice: Robin
