# Integration of FRET and WEST

## 🔍 Project Overview

This is [Songyan Lai](https://songyanlai.github.io/)'s final project for his undergraduate degree in Computer Science at the National University of Ireland Maynooth (Maynooth University).

- **Contact**:  
  📧 laisongyan@foxmail.com  
  📧 SONGYAN.LAI.2024@mumail.ie
- **Maynoooth University Student ID**: 24250371
- **Supervisor**: [Prof. Rosemary Monahan](https://www.maynoothuniversity.ie/faculty-science-engineering/our-people/rosemary-monahan)
- **Project Type**: Research

---

## 🎯 Project Abstract

This research focuses on integrating FRET and WEST to enhance requirements traceability in safety-critical systems. FRET, originally developed by NASA’s Software Verification and Validation team and later refined into MU-FRET, translates natural language requirements into Linear Temporal Logic (LTL), while the WEST tool validates Mission-time LTL (MLTL) formulas by generating corresponding regular expressions. The project involves a detailed examination of FRET, WEST, and related LTL frameworks, alongside mainstream formal verification tools, to identify the necessity for integration and to pinpoint limitations within WEST. Central to the study is the development of an interconversion process between LTL and MLTL that ensures compatibility with WEST’s syntax, utilizing regular expression-based mapping, variable normalization, and mission-time interval translation. A proof-of-concept JavaScript translator, refined through aerospace and medical case studies and incorporated as a feature within FRET, has reduced manual work by 85% and eliminated 80% of syntax differences, with comparative validation from the lead developers of both tools confirming its efficacy. For more details, please refer to 'Final Report.pdf'.

---

## 📂 Repository Structure

### FRET_to_WEST_MLTL_Converter

- **Code Implementation**  
  JavaScript/HTML syntax converter (200+ LOC) developed through ~10 iterations
- **Testing Files**  
  Archive of iterative development artifacts
- **Deployment Status**  
  Integrated into [MU-FRET platform](https://github.com/valu3s-mu/mu-fret)

### Research_Documents

- **Key Analyses**
  - _The Motivation for Integration of WEST and FRET_
  - _Exploring WEST's Role in Temporal Logic Validation_
- **Progress Reports**
  - Interim Report
  - Final Progress Report & Future Roadmap
- **Case Studies**
  - Formal-to-Runtime Verification Pipeline Implementation
  - WEST Validation Compliance with R2U2 Monitoring Specifications
  - Applied Integration Patterns in Aerospace Systems
- **Other Supplementary Materials**
  - Preliminary FRET/WEST comparative analysis
  - LTL Variants Survey Report
  - LAST V Operator Technical Brief
  - FRET-WEST-R2U2 Triad Study
  - FRET Operational Limitations Log
  - WEST Validation Scope Specification
  - WEST Team Discussion Report

---

## ✅ Completed Work

1. **Automated Translation Framework**
   A JavaScript translator that resynchronizes FRET's LTL to WEST's MLTL reduces manual translation time in industrial case studies. Furthermore, Innovations include Regex operator rewriting, finite-to-infinite trace emulation, and adaptive temporal granularity synchronization for real-time constraints.
2. **Semantic-Preserving Heuristics**
   Problem-domain-specific rule sets maintain logical equivalence during conflicts in mission-time intervals and nesting operator alignment. The ability to reconfigure resolution parameters minimizes quantization errors for safety-critical uses.
3. **Toolchain Interoperability**
   Mutual traceability provides linkages of MLTL results with FRETish requirements that are auditable and iteratively refineable. Further, open-source release induces co-operation amongst academia (Maynooth University, Iowa State University) and industry (KBR/NASA Ames Research Center).
4. **Empirical Validation**
   Case studies show 85% syntactic correctness and 80% semantic similarity.

---

## 🔮 Future Directions

1. **Semantic Equivalence Verification**
   Integrate SMT solvers (e.g., Z3) formally establish equivalence between FRET's LTL and MLTL translation.
2. **Multi-Tool Redundancy**
   Expand integration to runtime monitors (e.g., R2U2) and probabilistic checkers (e.g., PRISM).
3. **Cloud-Native Scalability**
   Execute containerized WEST instances on AWS/Azure for mission-scale verification.
4. **Human-Centric Interfaces**
   Develop AI-enabled annotation tools to map validation errors back to FRETish requirements.

---

## 🔗 Collaborators

- [NASA FRET](https://github.com/NASA-SW-VnV/fret)
- [MU-FRET](https://github.com/valu3s-mu/mu-fret)
- [VALU3S](https://repo.valu3s.eu/)
- [WEST Tool](https://github.com/zwang271/WEST)

---

## 📚 Literature Review

1. **Temporal Logic Foundations**  
   Pnueli (1977) LTL → MLTL extensions (Rozier 2020)
2. **Verification Tools**  
   NASA FRET → MU-FRET safety adaptations
3. **WEST Validation**  
   Elwing et al. (2024) syntax flexibility analysis

_Last Updated: April 2025_  
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
