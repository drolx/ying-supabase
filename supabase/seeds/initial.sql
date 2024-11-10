SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '6202e62b-1496-4a52-bb0d-2e2b538b3542', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@drolx.com","user_id":"f91e91dc-7a05-4f7a-94bb-6e950616e881","user_phone":""}}', '2024-11-10 11:58:17.606261+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dfbdd402-b013-4576-bfc4-480d0b8aae46', '{"action":"login","actor_id":"f91e91dc-7a05-4f7a-94bb-6e950616e881","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 11:59:02.733515+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd96610e3-820d-41e7-b125-070d4b12fc24', '{"action":"login","actor_id":"f91e91dc-7a05-4f7a-94bb-6e950616e881","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 12:00:44.505294+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bdf1c6d6-5f4c-4ceb-9041-c1c12f6de51b', '{"action":"login","actor_id":"f91e91dc-7a05-4f7a-94bb-6e950616e881","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 12:02:38.09182+00', ''),
	('00000000-0000-0000-0000-000000000000', '594e151c-a862-490d-a065-464bcb352066', '{"action":"user_recovery_requested","actor_id":"f91e91dc-7a05-4f7a-94bb-6e950616e881","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"user"}', '2024-11-10 12:03:12.940775+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fbe6f778-6d17-4d0d-8399-9fef26431359', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@drolx.com","user_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","user_phone":""}}', '2024-11-10 12:03:44.629391+00', ''),
	('00000000-0000-0000-0000-000000000000', '31250c7c-46ac-451e-ac03-b92e742d9090', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 12:04:10.068325+00', ''),
	('00000000-0000-0000-0000-000000000000', '94073308-7066-4c42-b28d-d855330def7c', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 12:49:12.343563+00', ''),
	('00000000-0000-0000-0000-000000000000', '6060aed8-e5e4-49bb-ade5-395a13a62cff', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 12:57:36.498174+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e19b806f-0ac8-4c62-8603-b49e7df88e7c', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 12:57:46.241312+00', ''),
	('00000000-0000-0000-0000-000000000000', '289cbfd2-3df3-49fc-95e5-e5c39fd1b102', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 12:58:05.116394+00', ''),
	('00000000-0000-0000-0000-000000000000', '71b13930-4af1-4ca9-b97b-bef85b810153', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 13:30:57.404335+00', ''),
	('00000000-0000-0000-0000-000000000000', '876587ba-f1b1-4c5b-b42c-cf29fe8c8918', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 13:36:15.229188+00', ''),
	('00000000-0000-0000-0000-000000000000', '877cd888-a796-4e38-aea6-ab04c4590e58', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 13:36:22.456281+00', ''),
	('00000000-0000-0000-0000-000000000000', '45e6813b-ace9-47c4-aba2-c9df2b7d525b', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 13:37:32.624579+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e44a1ee3-110a-4f90-8496-89a15a168050', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 13:48:04.017207+00', ''),
	('00000000-0000-0000-0000-000000000000', '729ea630-931d-412e-9359-70e79e078a64', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 14:28:58.073292+00', ''),
	('00000000-0000-0000-0000-000000000000', '8eaa9c62-fbfd-4c67-b9ce-437efaf53cdc', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 14:32:01.242982+00', ''),
	('00000000-0000-0000-0000-000000000000', '661396c0-d280-46ee-ba0f-a8d26ae5c8b4', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 14:32:38.257489+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba87b9c4-2a65-4a84-8a83-0fc279f93d61', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 14:32:48.802367+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f922a49d-ff2f-4dfa-9faf-5f910be53682', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 14:33:06.780484+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aff0ce2c-f101-4708-8b9e-fdf11bd25150', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 14:34:11.124532+00', ''),
	('00000000-0000-0000-0000-000000000000', '05fb363a-97ee-4bb4-8115-9c46f7bed86b', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 14:42:05.371585+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ddc0156-4172-4cf1-b59e-3da4ab81f37f', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 14:53:17.218517+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a3ae3290-5340-4c12-8649-3520f7d9e5cb', '{"action":"login","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 14:53:45.243136+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee646f75-8b77-4676-8c00-185e543ae8c5', '{"action":"logout","actor_id":"b1b6fe5d-428b-4cff-86aa-eb6eecadf2e7","actor_username":"test@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 15:05:54.231765+00', ''),
	('00000000-0000-0000-0000-000000000000', '4087c6c8-73c9-403d-9489-05e32327da1e', '{"action":"user_signedup","actor_id":"43a9c1e6-c55c-48a0-9419-6831a0027e38","actor_username":"demo@drolx.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-11-10 15:24:11.154408+00', ''),
	('00000000-0000-0000-0000-000000000000', '250bb5e6-7693-45cc-803e-3206300d1109', '{"action":"login","actor_id":"43a9c1e6-c55c-48a0-9419-6831a0027e38","actor_username":"demo@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 15:24:11.15787+00', ''),
	('00000000-0000-0000-0000-000000000000', '57372e06-b378-41f7-bdac-b919660ca79b', '{"action":"logout","actor_id":"43a9c1e6-c55c-48a0-9419-6831a0027e38","actor_username":"demo@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 15:40:40.457602+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ffe06c03-f7c8-4d8a-92ad-b4bcd69ce7cb', '{"action":"user_signedup","actor_id":"f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66","actor_username":"demo@drolx.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-11-10 15:45:08.685381+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e828e112-b90c-4c5d-a36b-4e636aad88bb', '{"action":"login","actor_id":"f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66","actor_username":"demo@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 15:45:08.689076+00', ''),
	('00000000-0000-0000-0000-000000000000', '581aa155-25fa-4e32-bd75-fa43df73cc12', '{"action":"logout","actor_id":"f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66","actor_username":"demo@drolx.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 16:25:30.152418+00', ''),
	('00000000-0000-0000-0000-000000000000', '05d7a95a-4df1-4daf-be00-e796c6da5486', '{"action":"login","actor_id":"f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66","actor_username":"demo@drolx.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 16:25:45.284445+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66', 'authenticated', 'authenticated', 'demo@drolx.com', '$2a$10$qAhlH.1F1Sbmu.kT7vdqeuteHLGnE78tNDjrI9k.sDwwVdsLFHD0W', '2024-11-10 15:45:08.68588+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-11-10 16:25:45.285303+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66", "email": "demo@drolx.com", "customer": false, "lastName": "Demo", "firstName": "Johnny", "email_verified": false, "phone_verified": false}', NULL, '2024-11-10 15:45:08.680648+00', '2024-11-10 16:25:45.287047+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66', 'f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66', '{"sub": "f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66", "email": "demo@drolx.com", "customer": false, "lastName": "Demo", "firstName": "Johnny", "email_verified": false, "phone_verified": false}', 'email', '2024-11-10 15:45:08.68327+00', '2024-11-10 15:45:08.683308+00', '2024-11-10 15:45:08.683308+00', 'e7e47a96-a374-41a7-bd0d-6c4af57ac614');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('9d6494c1-803c-471f-bb61-92bb68d28c04', 'f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66', '2024-11-10 16:25:45.285382+00', '2024-11-10 16:25:45.285382+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0', '172.20.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('9d6494c1-803c-471f-bb61-92bb68d28c04', '2024-11-10 16:25:45.287433+00', '2024-11-10 16:25:45.287433+00', 'password', '2c2518dd-a690-41b0-9a27-50e222a42a4f');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 16, '5qhE2L3KOPlkxLXjEDkr3Q', 'f9ae3c91-4ea3-4d0c-8ab4-1a2b0c82be66', false, '2024-11-10 16:25:45.286115+00', '2024-11-10 16:25:45.286115+00', NULL, '9d6494c1-803c-471f-bb61-92bb68d28c04');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."categories" ("id", "created_at", "name", "description") VALUES
	(1, '2024-11-10 17:13:27.677029+00', 'category-00', 'category 00 description'),
	(2, '2024-11-10 17:13:45.027208+00', 'category-01', 'category 01 description');


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."articles" ("id", "created_at", "title", "content", "category_id", "published_at") VALUES
	(1, '2024-11-10 17:14:18.158021+00', 'article-00', 'article 00 content', 1, NULL),
	(2, '2024-11-10 17:14:41.227076+00', 'article-01', 'article 00 content', 2, NULL);


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tags" ("id", "created_at", "name") VALUES
	(1, '2024-11-10 17:12:48.617661+00', 'tag-00'),
	(2, '2024-11-10 17:12:58.938595+00', 'tag-01');


--
-- Data for Name: article_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."article_tags" ("article_id", "tag_id") VALUES
	(1, 1),
	(2, 2);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 16, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."articles_id_seq"', 2, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."categories_id_seq"', 2, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tags_id_seq"', 2, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
