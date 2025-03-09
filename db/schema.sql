<<<<<<< HEAD
-- 🚀 Database Schema for Threat Intelligence Platform

CREATE DATABASE threat_db;
\c threat_db;

-- 🚀 Table 1: Assets
CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    asset_name VARCHAR(255) NOT NULL,
    asset_type VARCHAR(50) CHECK (asset_type IN ('Hardware', 'Software', 'Data', 'People', 'Process')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🚀 Table 2: Threats
CREATE TABLE threats (
    id SERIAL PRIMARY KEY,
    asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
    threat_name VARCHAR(255) NOT NULL,
    threat_type VARCHAR(255),
    risk_level INT CHECK (risk_level BETWEEN 1 AND 10),
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🚀 Table 3: Vulnerabilities
CREATE TABLE vulnerabilities (
    id SERIAL PRIMARY KEY,
    asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
    cve_id VARCHAR(50) UNIQUE NOT NULL, -- Example: CVE-2023-1234
    description TEXT,
    severity VARCHAR(10) CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🚀 Table 4: Risk Ratings
CREATE TABLE risk_ratings (
    id SERIAL PRIMARY KEY,
    asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
    threat_id INT REFERENCES threats(id) ON DELETE CASCADE,
    vulnerability_id INT REFERENCES vulnerabilities(id) ON DELETE CASCADE,
    risk_score INT CHECK (risk_score BETWEEN 1 AND 100),
    mitigation_plan TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🚀 Table 5: TVA Mapping (Threat-Vulnerability-Asset)
CREATE TABLE tva_mapping (
    id SERIAL PRIMARY KEY,
    asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
    threat_id INT REFERENCES threats(id) ON DELETE CASCADE,
    vulnerability_id INT REFERENCES vulnerabilities(id) ON DELETE CASCADE,
    likelihood INT CHECK (likelihood BETWEEN 1 AND 5),
    impact INT CHECK (impact BETWEEN 1 AND 5),
    risk_score INT GENERATED ALWAYS AS (likelihood * impact) STORED
);
=======
--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-03-09 12:32:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16429)
-- Name: assets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assets (
    id integer NOT NULL,
    asset_name character varying(255) NOT NULL,
    asset_type character varying(50),
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT asset_type_check CHECK (((asset_type)::text = ANY ((ARRAY['Hardware'::character varying, 'Software'::character varying, 'Data'::character varying, 'People'::character varying, 'Process'::character varying])::text[])))
);


ALTER TABLE public.assets OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16428)
-- Name: assets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assets_id_seq OWNER TO postgres;

--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 217
-- Name: assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assets_id_seq OWNED BY public.assets.id;


--
-- TOC entry 224 (class 1259 OID 16473)
-- Name: risk_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.risk_ratings (
    id integer NOT NULL,
    asset_id integer,
    threat_id integer,
    vulnerability_id integer,
    risk_score integer,
    mitigation_plan text,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT risk_ratings_risk_score_check CHECK (((risk_score >= 1) AND (risk_score <= 100)))
);


ALTER TABLE public.risk_ratings OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16472)
-- Name: risk_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.risk_ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.risk_ratings_id_seq OWNER TO postgres;

--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 223
-- Name: risk_ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.risk_ratings_id_seq OWNED BY public.risk_ratings.id;


--
-- TOC entry 220 (class 1259 OID 16439)
-- Name: threats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.threats (
    id integer NOT NULL,
    asset_id integer,
    threat_name character varying(255) NOT NULL,
    threat_type character varying(255),
    risk_level integer,
    detected_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT threats_risk_level_check CHECK (((risk_level >= 1) AND (risk_level <= 10)))
);


ALTER TABLE public.threats OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16438)
-- Name: threats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.threats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.threats_id_seq OWNER TO postgres;

--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 219
-- Name: threats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.threats_id_seq OWNED BY public.threats.id;


--
-- TOC entry 226 (class 1259 OID 16506)
-- Name: tva_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tva_mapping (
    id integer NOT NULL,
    asset_id integer,
    threat_id integer,
    vulnerability_id integer,
    likelihood integer,
    impact integer,
    risk_score integer GENERATED ALWAYS AS ((likelihood * impact)) STORED,
    CONSTRAINT tva_mapping_impact_check CHECK (((impact >= 1) AND (impact <= 5))),
    CONSTRAINT tva_mapping_likelihood_check CHECK (((likelihood >= 1) AND (likelihood <= 5)))
);


ALTER TABLE public.tva_mapping OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16505)
-- Name: tva_mapping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tva_mapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tva_mapping_id_seq OWNER TO postgres;

--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 225
-- Name: tva_mapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tva_mapping_id_seq OWNED BY public.tva_mapping.id;


--
-- TOC entry 222 (class 1259 OID 16455)
-- Name: vulnerabilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vulnerabilities (
    id integer NOT NULL,
    asset_id integer,
    cve_id character varying(50) NOT NULL,
    description text,
    severity character varying(10),
    reported_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT vulnerabilities_severity_check CHECK (((severity)::text = ANY ((ARRAY['Low'::character varying, 'Medium'::character varying, 'High'::character varying, 'Critical'::character varying])::text[])))
);


ALTER TABLE public.vulnerabilities OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16454)
-- Name: vulnerabilities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vulnerabilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vulnerabilities_id_seq OWNER TO postgres;

--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 221
-- Name: vulnerabilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vulnerabilities_id_seq OWNED BY public.vulnerabilities.id;


--
-- TOC entry 4762 (class 2604 OID 16432)
-- Name: assets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets ALTER COLUMN id SET DEFAULT nextval('public.assets_id_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 16476)
-- Name: risk_ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.risk_ratings ALTER COLUMN id SET DEFAULT nextval('public.risk_ratings_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 16442)
-- Name: threats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threats ALTER COLUMN id SET DEFAULT nextval('public.threats_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 16509)
-- Name: tva_mapping id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tva_mapping ALTER COLUMN id SET DEFAULT nextval('public.tva_mapping_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 16458)
-- Name: vulnerabilities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vulnerabilities ALTER COLUMN id SET DEFAULT nextval('public.vulnerabilities_id_seq'::regclass);


--
-- TOC entry 4779 (class 2606 OID 16437)
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 16482)
-- Name: risk_ratings risk_ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.risk_ratings
    ADD CONSTRAINT risk_ratings_pkey PRIMARY KEY (id);


--
-- TOC entry 4781 (class 2606 OID 16448)
-- Name: threats threats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threats
    ADD CONSTRAINT threats_pkey PRIMARY KEY (id);


--
-- TOC entry 4789 (class 2606 OID 16514)
-- Name: tva_mapping tva_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tva_mapping
    ADD CONSTRAINT tva_mapping_pkey PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 16466)
-- Name: vulnerabilities vulnerabilities_cve_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vulnerabilities
    ADD CONSTRAINT vulnerabilities_cve_id_key UNIQUE (cve_id);


--
-- TOC entry 4785 (class 2606 OID 16464)
-- Name: vulnerabilities vulnerabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vulnerabilities
    ADD CONSTRAINT vulnerabilities_pkey PRIMARY KEY (id);


--
-- TOC entry 4792 (class 2606 OID 16483)
-- Name: risk_ratings risk_ratings_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.risk_ratings
    ADD CONSTRAINT risk_ratings_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON DELETE CASCADE;


--
-- TOC entry 4793 (class 2606 OID 16488)
-- Name: risk_ratings risk_ratings_threat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.risk_ratings
    ADD CONSTRAINT risk_ratings_threat_id_fkey FOREIGN KEY (threat_id) REFERENCES public.threats(id) ON DELETE CASCADE;


--
-- TOC entry 4794 (class 2606 OID 16493)
-- Name: risk_ratings risk_ratings_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.risk_ratings
    ADD CONSTRAINT risk_ratings_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES public.vulnerabilities(id) ON DELETE CASCADE;


--
-- TOC entry 4790 (class 2606 OID 16449)
-- Name: threats threats_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threats
    ADD CONSTRAINT threats_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON DELETE CASCADE;


--
-- TOC entry 4795 (class 2606 OID 16515)
-- Name: tva_mapping tva_mapping_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tva_mapping
    ADD CONSTRAINT tva_mapping_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON DELETE CASCADE;


--
-- TOC entry 4796 (class 2606 OID 16520)
-- Name: tva_mapping tva_mapping_threat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tva_mapping
    ADD CONSTRAINT tva_mapping_threat_id_fkey FOREIGN KEY (threat_id) REFERENCES public.threats(id) ON DELETE CASCADE;


--
-- TOC entry 4797 (class 2606 OID 16525)
-- Name: tva_mapping tva_mapping_vulnerability_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tva_mapping
    ADD CONSTRAINT tva_mapping_vulnerability_id_fkey FOREIGN KEY (vulnerability_id) REFERENCES public.vulnerabilities(id) ON DELETE CASCADE;


--
-- TOC entry 4791 (class 2606 OID 16467)
-- Name: vulnerabilities vulnerabilities_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vulnerabilities
    ADD CONSTRAINT vulnerabilities_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(id) ON DELETE CASCADE;


-- Completed on 2025-03-09 12:32:05

--
-- PostgreSQL database dump complete
--

>>>>>>> f6b36b7 (Updated schema.sql ThreatDashboard and added fetchosint and riskanalysis)
