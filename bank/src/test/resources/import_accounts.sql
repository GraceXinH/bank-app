INSERT INTO User(id, firstName, lastName, loginName, password, address, email, openDate, phone, role)
VALUES (1, 'Alice', 'Matte', 'alice', 'password', '1234 rue watt Greenfield park QC J3U 1H4', 'alice@mail.com',
'2023-02-24 22:43:58.246000', '1-514-987-7888', 'USER');
INSERT INTO accounts(id, balance, name, number, opendate, status, type, userid)
VALUES (1, 100, 'check one', 200300, '2023-02-26 22:43:58.246000', 'ACTIVE', 'CHEQUING', 1);
INSERT INTO accounts(id, balance, name, number, opendate, status, type, userid)
VALUES (2, 0, 'saving one', 200301, '2023-02-26 22:43:58.246000', 'ACTIVE', 'SAVING', 1);