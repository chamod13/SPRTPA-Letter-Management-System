# Database Setup Guide (PostgreSQL)

Meka follow karala database eka lesiyenma hadaganna puluwan.

## Step 1: PostgreSQL Install Karaganna

Computer eke PostgreSQL nattam, menna me link eken download karala install karanna:
[Download PostgreSQL](https://www.postgresql.org/download/windows/)

**Install karaddi ena "Password" eka mathaka thiyaganna!** Meka godak wadagath. (Example: `root`, `admin123`, `password`)

## Step 2: pgAdmin Open Karanna

PostgreSQL install kalama **pgAdmin 4** kiyala tool ekakuth enawa. Eka open karanna.
(Start Menu eke "pgAdmin 4" kiyala search karanna).

1. Open unama, **Servers** kiyana eka double click karanna.
2. Ethakota Password eka ahai. Aru install karaddi dapu password eka gahanna.

## Step 3: Aluth Database Ekak Hadamu

1. **Databases** kiyana folder eka uda Right Click karanna.
2. `Create` -> `Database...` thoranna.
3. Database eke nama vidiyata **`sprtpa_lms`** kiyala gahanna.
4. **Save** button eka obanna.

## Step 4: Tables Tika Hadamu (Schema Import)

Dan api hadapu SQL script eka run karanna oni.

1. Hadapu **`sprtpa_lms`** database eka uda Right Click karanna.
2. **Query Tool** kiyana eka thoranna.
3. Dan `backend/database.sql` file eke thiyena code okkoma copy karaganna.
   - (Meka oya project folder eke `backend` athule `database.sql` kiyala athi).
4. E copy karapu code eka, pgAdmin eke open unu Query Tool eke Paste karanna.
5. Uda thiyena **Play Button** eka (Run) obanna (nathnam `F5` gahanna).

Dan "CREATE TABLE" kiyala messages ewi. Wade hari!

## Step 5: Backend eka Connect Karamu

1. Project folder eke `backend/.env` file eka open karanna.
2. Eke `DB_PASSWORD=yourpassword` kiyana thanata, oyage PostgreSQL password eka danna.
   Example: `DB_PASSWORD=mysecret123`

Echcharai! Dan Database eka wada.
