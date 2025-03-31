-- Create members table
CREATE TABLE member
(
    id       VARCHAR(255) PRIMARY KEY,
    email    VARCHAR(255) NOT NULL,
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    bio      text NULL
);
-- TODO: Need to add type and date to this entity.
-- Create activities table
CREATE TABLE activity
(
    id           VARCHAR(255) PRIMARY KEY,
    type         VARCHAR(50)  NOT NULL,
    averageSpeed DOUBLE       NOT NULL,
    distance     DOUBLE       NOT NULL,
    elevation    DOUBLE       NOT NULL,
    movingTime   VARCHAR(255) NOT NULL,
    member_id    VARCHAR(255) NOT NULL,
    FOREIGN KEY (member_id) REFERENCES member (id)
);

-- Create communities table
CREATE TABLE community
(
    id          VARCHAR(255) PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- Create posts table
CREATE TABLE post
(
    id           VARCHAR(255) PRIMARY KEY,
    date         DATETIME     NOT NULL,
    text         TEXT         NOT NULL,
    community_id VARCHAR(255) NOT NULL,
    writer_id    VARCHAR(255) NOT NULL,
    activity_id  VARCHAR(255),
    FOREIGN KEY (community_id) REFERENCES community (id),
    FOREIGN KEY (writer_id) REFERENCES member (id),
    FOREIGN KEY (activity_id) REFERENCES activity (id)
);

-- Create comments table
CREATE TABLE comment
(
    id        VARCHAR(255) PRIMARY KEY,
    date      DATETIME     NOT NULL,
    text      TEXT         NOT NULL,
    member_id VARCHAR(255) NOT NULL,
    post_id   VARCHAR(255) NOT NULL,
    FOREIGN KEY (member_id) REFERENCES member (id),
    FOREIGN KEY (post_id) REFERENCES post (id)
);

-- Create likes_table
CREATE TABLE likes_table
(
    id         VARCHAR(255) PRIMARY KEY,
    comment_id VARCHAR(255),
    post_id    VARCHAR(255),
    FOREIGN KEY (comment_id) REFERENCES comment (id),
    FOREIGN KEY (post_id) REFERENCES post (id)
);

CREATE TABLE community_membership
(
    member_id   VARCHAR(255) NOT NULL,
    community_id VARCHAR(255) NOT NULL,
    join_date   DATETIME     NOT NULL,
    role        VARCHAR(255) NOT NULL,  -- Role of the member in the community (e.g., "member", "admin")
    PRIMARY KEY (member_id, community_id),  -- Composite Primary Key to ensure unique relationships
    FOREIGN KEY (member_id) REFERENCES member (id),
    FOREIGN KEY (community_id) REFERENCES community (id)
);

-- Create rewards table
CREATE TABLE reward
(
    id           VARCHAR(255) PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    requirements TEXT         NOT NULL,
    type         VARCHAR(255) NOT NULL,
    community_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (community_id) REFERENCES community (id)
);

-- Insert members
INSERT INTO member (id, email, name, password, username, bio)
VALUES ('f2f5c081-6c97-4e8e-9a2d-b08d2c09c567', 'john.doe@example.com', 'John Doe', 'password123', 'john_doe', 'John Doe bio'),
       ('1b7f9f76-1c07-4e9b-a5a0-15c89e56f34a', 'jane.smith@example.com', 'Jane Smith', 'password456', 'jane_smith', 'Jane Smith bio'),
       ('b0cdeabe-4c43-4314-9f5c-b2419a2bff66', 'alex.jones@example.com', 'Alex Jones', 'password789', 'alex_jones', 'Alex Jones bio'),
       ('ad041052-527b-4a5c-b6d2-222a86a810be', 'maria.gonzalez@example.com', 'Maria Gonzalez', 'password321',
        'maria_gonzalez', 'Maria Gonzalez bio'),
       ('7c61b056-1ec4-4dbd-bbc1-6d01c9d4e033', 'chris.wilson@example.com', 'Chris Wilson', 'password654',
        'chris_wilson', 'Chris Wilson bio');

-- Insert activities
INSERT INTO activity (id, type, averageSpeed, distance, elevation, movingTime, member_id)
VALUES ('a2f3c0c1-27f1-4660-b462-8b6d7e88a62d', 'RUN', 15.5, 100.0, 50.0, '01:30:00', 'f2f5c081-6c97-4e8e-9a2d-b08d2c09c567'),
       ('459d8135-3f96-4eeb-b78d-f35c96ae76f1', 'CYCLE', 12.0, 80.0, 30.0, '02:00:00', '1b7f9f76-1c07-4e9b-a5a0-15c89e56f34a'),
       ('d5fe4ed5-2e47-45b9-b58d-3a61d6bb6e5d', 'RUN', 18.0, 120.0, 75.0, '01:45:00', 'b0cdeabe-4c43-4314-9f5c-b2419a2bff66'),
       ('6de72f9e-631f-4df0-88d0-b53ab57ca8a3', 'CYCLE', 10.0, 50.0, 25.0, '03:00:00', 'ad041052-527b-4a5c-b6d2-222a86a810be'),
       ('c39e8729-b885-48d7-b728-7eaed084d5d1', 'RUN', 14.0, 90.0, 40.0, '01:15:00', '7c61b056-1ec4-4dbd-bbc1-6d01c9d4e033');

-- Insert communities
INSERT INTO community (id, name, description)
VALUES ('bc58d6a9-e83f-4a1a-b8cc-d93b20798998', 'Nature Lovers',
        'A community of people who love nature and outdoor activities'),
       ('f80e0b0c-0e9e-4db5-bb3b-cfa392b4e759', 'Tech Enthusiasts',
        'A community for people interested in technology and programming'),
       ('2556de32-5cbe-4429-8f63-60c0a5bdf3ba', 'Book Club', 'A community of book lovers'),
       ('365c179f-0920-4868-b99a-e84a02867c3a', 'Foodies', 'A community for people who love to cook and eat good food'),
       ('5c02a7ff-eeb7-4f4c-83ea-663b4d3fa27e', 'Travel Junkies',
        'A community for people who love to travel the world');

-- Insert posts
INSERT INTO post (id, date, text, community_id, writer_id, activity_id)
VALUES ('a9b1d3b1-4f07-4680-bd36-49cbec8a3888', '2025-03-07 10:00:00', 'Just finished a 10km run!',
        'bc58d6a9-e83f-4a1a-b8cc-d93b20798998', 'f2f5c081-6c97-4e8e-9a2d-b08d2c09c567',
        'a2f3c0c1-27f1-4660-b462-8b6d7e88a62d'),
       ('c8f3a94f-f6da-4b0f-b7ca-d0fca18c0712', '2025-03-07 11:00:00', 'Working on a new tech project',
        'f80e0b0c-0e9e-4db5-bb3b-cfa392b4e759', '1b7f9f76-1c07-4e9b-a5a0-15c89e56f34a',
        '459d8135-3f96-4eeb-b78d-f35c96ae76f1'),
       ('65f7b01b-4330-4e80-b967-b2cae5e2f307', '2025-03-07 12:00:00', 'Just finished reading a great book!',
        '2556de32-5cbe-4429-8f63-60c0a5bdf3ba', 'b0cdeabe-4c43-4314-9f5c-b2419a2bff66',
        'd5fe4ed5-2e47-45b9-b58d-3a61d6bb6e5d'),
       ('ace0a8c4-1072-4a22-b010-13e8de933694', '2025-03-07 13:00:00', 'Made a delicious pizza tonight!',
        '365c179f-0920-4868-b99a-e84a02867c3a', 'ad041052-527b-4a5c-b6d2-222a86a810be',
        '6de72f9e-631f-4df0-88d0-b53ab57ca8a3'),
       ('fd040795-6347-4d01-8c72-0a17c8152b98', '2025-03-07 14:00:00', 'Planning my next trip to Japan!',
        '5c02a7ff-eeb7-4f4c-83ea-663b4d3fa27e', '7c61b056-1ec4-4dbd-bbc1-6d01c9d4e033',
        'c39e8729-b885-48d7-b728-7eaed084d5d1');

-- Insert comments
INSERT INTO comment (id, date, text, member_id, post_id)
VALUES ('10b34e4f-68e5-4631-bbb3-93176d404e7a', '2025-03-07 10:30:00', 'Great job on the run!',
        '1b7f9f76-1c07-4e9b-a5a0-15c89e56f34a', 'a9b1d3b1-4f07-4680-bd36-49cbec8a3888'),
       ('fa8c4c9a-60d4-4688-97b7-30e80d0d0576', '2025-03-07 11:30:00', 'Keep it up!',
        'f2f5c081-6c97-4e8e-9a2d-b08d2c09c567', 'c8f3a94f-f6da-4b0f-b7ca-d0fca18c0712'),
       ('ed96003c-b29c-4e57-88ba-132e88f0d26e', '2025-03-07 12:30:00', 'Such an amazing book!',
        'b0cdeabe-4c43-4314-9f5c-b2419a2bff66', '65f7b01b-4330-4e80-b967-b2cae5e2f307'),
       ('fc9ad78d-445b-47a0-a3d9-f52c81a7a763', '2025-03-07 13:30:00', 'Yum! That pizza looks amazing!',
        'ad041052-527b-4a5c-b6d2-222a86a810be', 'ace0a8c4-1072-4a22-b010-13e8de933694'),
       ('7e5bb02e-519e-4d93-bbe5-97ea33f8e019', '2025-03-07 14:30:00', 'That trip sounds awesome!',
        '7c61b056-1ec4-4dbd-bbc1-6d01c9d4e033', 'fd040795-6347-4d01-8c72-0a17c8152b98');

-- Insert likes
INSERT INTO likes_table (id, comment_id, post_id)
VALUES ('f0d1b64e-9c9e-48c1-81b5-e4a3bbba8f7f', '10b34e4f-68e5-4631-bbb3-93176d404e7a', NULL),
       ('f2b7721e-e530-44a3-a5e2-d1cc6fef551a', 'fa8c4c9a-60d4-4688-97b7-30e80d0d0576', NULL),
       ('2edb9e84-7dbb-46a8-8c6f-488d835feb01', 'ed96003c-b29c-4e57-88ba-132e88f0d26e', NULL),
       ('a23cfe4a-ff7d-40d0-8726-fccf11832061', 'fc9ad78d-445b-47a0-a3d9-f52c81a7a763', NULL),
       ('f923edaf-3585-42c7-baf1-836f1b251748', '7e5bb02e-519e-4d93-bbe5-97ea33f8e019', NULL);

-- Insert community_membership data
INSERT INTO community_membership (member_id, community_id, join_date, role)
VALUES ('f2f5c081-6c97-4e8e-9a2d-b08d2c09c567', 'bc58d6a9-e83f-4a1a-b8cc-d93b20798998', '2025-03-07 09:00:00', 'member'),
       ('1b7f9f76-1c07-4e9b-a5a0-15c89e56f34a', 'f80e0b0c-0e9e-4db5-bb3b-cfa392b4e759', '2025-03-07 09:15:00', 'member'),
       ('ad041052-527b-4a5c-b6d2-222a86a810be', 'f80e0b0c-0e9e-4db5-bb3b-cfa392b4e759', '2025-03-07 09:15:00', 'member'),
       ('7c61b056-1ec4-4dbd-bbc1-6d01c9d4e033', 'f80e0b0c-0e9e-4db5-bb3b-cfa392b4e759', '2025-03-07 09:15:00', 'member'),
       ('b0cdeabe-4c43-4314-9f5c-b2419a2bff66', '2556de32-5cbe-4429-8f63-60c0a5bdf3ba', '2025-03-07 09:30:00', 'admin');


-- Insert rewards
INSERT INTO reward (id, name, requirements, type, community_id)
VALUES ('7b7c08e8-97fe-4dbb-b4d5-4f6c4bdf577f', 'Top Contributor', 'Participate in at least 10 posts', 'Badge',
        'bc58d6a9-e83f-4a1a-b8cc-d93b20798998'),
       ('38fffc0b-6891-4b8c-9d99-cdbff35ff9d4', 'Tech Guru', 'Help 5 people in the community', 'Badge',
        'f80e0b0c-0e9e-4db5-bb3b-cfa392b4e759'),
       ('660d7a06-3876-4971-b174-411a6cb5d960', 'Bookworm', 'Read 5 books in a month', 'Certificate',
        '2556de32-5cbe-4429-8f63-60c0a5bdf3ba'),
       ('8e7f672b-c2f5-4b77-9fd9-b8316fbb3494', 'Master Chef', 'Cook 3 dishes and share with the community', 'Voucher',
        '365c179f-0920-4868-b99a-e84a02867c3a'),
       ('d73b4182-e5a7-463d-846f-e1e1ec034474', 'Globetrotter', 'Travel to 5 different countries', 'Trophy',
        '5c02a7ff-eeb7-4f4c-83ea-663b4d3fa27e');
