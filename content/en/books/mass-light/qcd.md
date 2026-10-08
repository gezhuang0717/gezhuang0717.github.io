---
title: 5. Why most ordinary mass is QCD mass
date: '2026-10-08T00:00:00+03:00'
weight: 5
showPagination: false
description: Valence quarks label conserved quantum numbers; they do not list every
  excitation inside a proton. QCD includes quark motion, gluon fields and interactions.
  The colour names are internal labels, not visible colours. The approximat
---

## Why three quarks are not a mass budget

Valence quarks label conserved quantum numbers; they do not list every excitation inside a proton. QCD includes quark motion, gluon fields and interactions. The colour names are internal labels, not visible colours. The approximate running-coupling formula below applies at high momentum transfer; it must not be used at its denominator zero to calculate a proton mass.


{{< reader-figure "original/proton_mass_qcd_en.png" "Why a proton is not just three quark masses." >}}

## 5.1 The QCD Lagrangian

For quark fields {{< reader-math "inline" >}}q_f{{< /reader-math >}} and gluon field strength {{< reader-math "inline" >}}G^a_{\mu\nu}{{< /reader-math >}},

{{< reader-math "block" >}}\mathcal{L}_{\mathrm{QCD}}
=\sum_f \bar q_f(i\gamma^\mu D_\mu-m_f)q_f
-\frac14G^a_{\mu\nu}G^{a\mu\nu}.{{< /reader-math >}}

The gauge group is {{< reader-math "inline" >}}SU(3)_C{{< /reader-math >}}. Its eight generators correspond to eight gluon gauge fields. “Color” is an internal quantum degree of freedom, not literal visible color. [Quantum Chromodynamics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-qcd.pdf)

## 5.2 Running coupling and asymptotic freedom

Unlike QED, a non-Abelian gauge theory has gauge bosons that themselves carry the gauge charge. At one loop,

{{< reader-math "block" >}}\mu\frac{d\alpha_s}{d\mu}
=-\frac{\beta_0}{2\pi}\alpha_s^2+\cdots,{{< /reader-math >}}

with

{{< reader-math "block" >}}\beta_0=11-\frac{2}{3}n_f{{< /reader-math >}}

for QCD with {{< reader-math "inline" >}}n_f{{< /reader-math >}} active quark flavors. For {{< reader-math "inline" >}}n_f<16.5{{< /reader-math >}}, {{< reader-math "inline" >}}\beta_0>0{{< /reader-math >}}, and the strong coupling decreases at high momentum transfer:

{{< reader-math "block" >}}\alpha_s(Q)\simeq
\frac{4\pi}{\beta_0\ln(Q^2/\Lambda_{\mathrm{QCD}}^2)}.{{< /reader-math >}}

This is asymptotic freedom, discovered independently by Gross and Wilczek and by Politzer in 1973. [Ultraviolet Behavior of Non-Abelian Gauge Theories (1973)](https://doi.org/10.1103/PhysRevLett.30.1343) · [Reliable Perturbative Results for Strong Interactions? (1973)](https://doi.org/10.1103/PhysRevLett.30.1346) · [Quantum Chromodynamics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-qcd.pdf)

At low energy the coupling becomes strong and perturbation theory fails. One then needs nonperturbative methods such as lattice QCD, effective field theory, sum rules, or phenomenological models.

## 5.3 Confinement is not “caused by lack of a color partner”

Physical asymptotic states are color singlets, but confinement should not be reduced to the mnemonic “a colored quark cannot find a matching color.” The fundamental phenomenon is nonperturbative gauge dynamics. Wilson’s lattice formulation showed how an area law for large Wilson loops corresponds to a linearly rising static potential in the confining regime. [Confinement of quarks (1974)](https://doi.org/10.1103/PhysRevD.10.2445)

A common phenomenological potential for a heavy quark-antiquark pair is

{{< reader-math "block" >}}V(r)\approx -\frac{4}{3}\frac{\alpha_s}{r}+\sigma r,{{< /reader-math >}}

where {{< reader-math "inline" >}}\sigma{{< /reader-math >}} is the string tension. At sufficiently large separation the energy stored in the color field can be converted into new hadrons; experimentally one observes jets and hadronization, not isolated free quarks.

## 5.4 Chiral symmetry breaking is important, but it is not identical to confinement

For vanishing light-quark masses the QCD Lagrangian has an approximate chiral symmetry. The QCD vacuum spontaneously breaks this symmetry, producing a quark condensate and explaining why pions behave as pseudo-Nambu-Goldstone bosons. Dynamical chiral symmetry breaking is deeply connected to hadron structure and mass generation, but it is conceptually distinct from confinement. One should not say “confinement happens because chiral symmetry breaking traps gluons.” [Quark Masses (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-quark-masses.pdf) · [Dynamical Model of Elementary Particles Based on an Analogy with Superconductivity. I (1961)](https://doi.org/10.1103/PhysRev.122.345)

## 5.5 The trace anomaly and nucleon mass

Classical massless QCD would have no intrinsic mass scale, but quantization and renormalization introduce one through dimensional transmutation. The trace of the renormalized energy-momentum tensor has the schematic form

{{< reader-math "block" >}}T^\mu_{\ \mu}
=\frac{\beta(g)}{2g}G^a_{\mu\nu}G^{a\mu\nu}
+\sum_q(1+\gamma_m)m_q\bar q q.{{< /reader-math >}}

For a one-proton state at rest, matrix elements of the energy-momentum tensor encode the proton mass. Different decompositions distribute contributions among quark mass, quark energy, gluon energy, and anomaly terms in different ways; some components are renormalization-scale and scheme dependent. That is why a single universal “99% pie chart” is misleading. Recent lattice work continues to test and refine these decomposition sum rules from first principles. [Revisiting the proton mass decomposition (2020)](https://doi.org/10.1103/PhysRevD.102.114042) · [Lattice-QCD Validation of Hadron Mass and Trace-Anomaly Decomposition Sum Rules (2026)](https://doi.org/10.1103/5n46-717z)

The safe popular-level conclusion is:

> **The Higgs mechanism sets the elementary quark mass parameters, but the bulk of the proton and neutron rest energy emerges from strongly interacting QCD dynamics.**

Because ordinary visible matter is dominated by nucleons, most of the mass of everyday objects is therefore QCD energy rather than the direct sum of elementary fermion rest masses.



[Contents]({{< relref "books/mass-light/_index.md" >}}) · [Previous chapter](../higgs/) · [Next chapter](../interactions/)
