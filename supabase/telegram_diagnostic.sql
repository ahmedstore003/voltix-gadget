-- =============================================================================
-- DIAGNOSTIC Telegram — à coller dans Dashboard Supabase → SQL Editor
-- Ce script ne modifie rien : il affiche l'état réel de l'installation.
-- =============================================================================

-- 1) Quelle est la VRAIE signature de net.http_post sur ton instance ?
--    (c'est elle qui aylindé le 42883 "function does not exist")
select p.oid::regprocedure as signature,
       pg_get_function_arguments(p.oid) as arguments
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where p.proname = 'http_post'
  and n.nspname in ('net', 'extensions')
order by 1;

-- 2) La table de config existe et est-elle active ?
select id, chat_id, enabled,
       left(bot_token, 12) || '…' as token_masked,
       length(bot_token) as token_length
from public.telegram_alert_config;

-- 3) La fonction et le trigger sont-ils bien installés ?
select p.proname,
       l.lanname,
       t.tgname,
       t.tgenabled,
       pg_get_function_result(p.oid) as returns
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
join pg_language l on l.oid = p.prolang
left join pg_trigger t on t.tgfoid = p.oid
where p.proname = 'notify_telegram_new_order';

-- 4) Quelles colonnes existent vraiment dans les tables net.* ?
--    (les colonnes varient selon la version de pg_net : ne suppose rien)
select table_name, ordinal_position, column_name, data_type
from information_schema.columns
where table_schema = 'net'
  and table_name in ('http_request_queue', '_http_response', 'http_response')
order by table_name, ordinal_position;

-- 5) File d'attente : lignes en attente d'envoi
select count(*) as queued_requests from net.http_request_queue;

-- 6) Dernières réponses reçues (colonnes filtrées dynamiquement)
select *
from net._http_response
order by 1 desc
limit 5;

-- 7) Le worker pg_net tourne-t-il ? (si absent, rien ne partira jamais)
select extname, extversion
from pg_extension
where extname = 'pg_net';
