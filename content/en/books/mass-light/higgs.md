---
title: '4. The Higgs field: what it does and what it does not do'
date: '2026-10-08T00:00:00+03:00'
weight: 4
showPagination: false
description: The vacuum is the lowest-energy state, not simply “a place with no objects”.
  A vacuum expectation value is an average of a field operator in that state. The
  Higgs boson is an excitation around the nonzero Higgs background. The fol
---

## Field, vacuum and excitation

The vacuum is the lowest-energy state, not simply “a place with no objects”. A vacuum expectation value is an average of a field operator in that state. The Higgs boson is an excitation around the nonzero Higgs background. The following mass relations are tree-level relations in natural units; radiative corrections matter in precision comparisons. Up-type quarks couple to the conjugate Higgs doublet, rather than the same doublet used for down-type quarks.


{{< reader-figure "higgs-en.svg" "Real-field slice through a symmetry-breaking potential; the vertical offset fixes an energy reference." >}}

## 4.1 Why naive gauge-boson mass terms are a problem

For a vector field {{< reader-math "inline" >}}A_\mu{{< /reader-math >}}, a Proca mass term has the form

{{< reader-math "block" >}}\mathcal{L}_{m}=\frac12m^2A_\mu A^\mu.{{< /reader-math >}}

Inserted by hand into an ordinary gauge theory, such a term generally destroys the gauge symmetry that makes the electroweak theory renormalizable and predictive. The breakthrough of 1964 was to show how gauge fields can acquire physical masses through spontaneous symmetry breaking without abandoning the underlying gauge structure. [Broken Symmetry and the Mass of Gauge Vector Mesons (1964)](https://doi.org/10.1103/PhysRevLett.13.321) · [Broken Symmetries and the Masses of Gauge Bosons (1964)](https://doi.org/10.1103/PhysRevLett.13.508) · [Global Conservation Laws and Massless Particles (1964)](https://doi.org/10.1103/PhysRevLett.13.585)

## 4.2 The Higgs potential

For the Standard Model Higgs doublet {{< reader-math "inline" >}}H{{< /reader-math >}}, a conventional potential is

{{< reader-math "block" >}}V(H)=-\mu^2 H^\dagger H+\lambda(H^\dagger H)^2,{{< /reader-math >}}

with {{< reader-math "inline" >}}\mu^2>0{{< /reader-math >}} and {{< reader-math "inline" >}}\lambda>0{{< /reader-math >}}. The minimum occurs not at {{< reader-math "inline" >}}H=0{{< /reader-math >}} but on a set of configurations with nonzero magnitude. In unitary gauge one may write

{{< reader-math "block" >}}H(x)=\frac{1}{\sqrt2}
\begin{pmatrix}
0\\
v+h(x)
\end{pmatrix},{{< /reader-math >}}

where {{< reader-math "inline" >}}v{{< /reader-math >}} is the vacuum expectation value and {{< reader-math "inline" >}}h(x){{< /reader-math >}} is the physical Higgs excitation.

The electroweak scale is fixed by the Fermi constant:

{{< reader-math "block" >}}v=(\sqrt2\,G_F)^{-1/2}\simeq246.22\ \mathrm{GeV}.{{< /reader-math >}}

This relation is one of the cleanest bridges between low-energy weak decay and electroweak symmetry breaking. [Electroweak Model and Constraints on New Physics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf) · [Higgs Boson Physics, Status of (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-higgs-boson.pdf)

## 4.3 How {{< reader-math "inline" >}}W{{< /reader-math >}} and {{< reader-math "inline" >}}Z{{< /reader-math >}} obtain mass

The Higgs kinetic term is

{{< reader-math "block" >}}(D_\mu H)^\dagger(D^\mu H),{{< /reader-math >}}

where the electroweak covariant derivative contains the {{< reader-math "inline" >}}SU(2)_L{{< /reader-math >}} and {{< reader-math "inline" >}}U(1)_Y{{< /reader-math >}} gauge fields. Expanding around {{< reader-math "inline" >}}v\neq0{{< /reader-math >}} generates gauge-boson mass terms:

{{< reader-math "block" >}}m_W=\frac{gv}{2},{{< /reader-math >}}

{{< reader-math "block" >}}m_Z=\frac{v}{2}\sqrt{g^2+g'^2}.{{< /reader-math >}}

The orthogonal neutral combination remains massless and is identified with the photon. Defining the weak mixing angle {{< reader-math "inline" >}}\theta_W{{< /reader-math >}} by

{{< reader-math "block" >}}\tan\theta_W=\frac{g'}{g},{{< /reader-math >}}

one has

{{< reader-math "block" >}}e=g\sin\theta_W=g'\cos\theta_W.{{< /reader-math >}}

This is the precise content behind the popular statement that electromagnetic and weak interactions are unified in the electroweak theory. [A Model of Leptons (1967)](https://doi.org/10.1103/PhysRevLett.19.1264) · [Electroweak Model and Constraints on New Physics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf)

{{< reader-figure "original/electroweak_breaking_en.png" "Electroweak symmetry breaking." >}}

## 4.4 Fermion masses and Yukawa couplings

Charged-fermion masses arise from Yukawa interactions with the Higgs field. Schematically,

{{< reader-math "block" >}}\mathcal{L}_Y=-y_f\,\overline{\psi}_{f,L}H\psi_{f,R}+\mathrm{h.c.}{{< /reader-math >}}

and after symmetry breaking

{{< reader-math "block" >}}m_f=\frac{y_f v}{\sqrt2}.{{< /reader-math >}}

The key point is conceptual: **the Higgs field does not donate packets of energy to create particles.** Instead, the nonzero Higgs background changes the quadratic terms in the field equations, so excitations propagate with a nonzero invariant mass parameter. The different fermion masses are encoded in different Yukawa couplings {{< reader-math "inline" >}}y_f{{< /reader-math >}}, whose hierarchy is not explained by the Standard Model. [Higgs Boson Physics, Status of (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-higgs-boson.pdf)

## 4.5 What about neutrinos?

The minimal renormalizable Standard Model was written with only left-handed neutrinos and therefore predicts zero neutrino mass. Oscillation experiments demonstrate that at least two neutrino mass eigenstates are nonzero because flavor oscillation requires nonzero mass-squared differences. The detailed origin of neutrino mass—Dirac masses from added right-handed neutrinos, Majorana masses through dimension-five operators, seesaw mechanisms, or something else—lies beyond the minimal Standard Model. [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

## 4.6 The Higgs boson discovery

ATLAS and CMS independently reported in 2012 a new boson near {{< reader-math "inline" >}}125\,\mathrm{GeV}{{< /reader-math >}} with local significances reaching the discovery threshold. Subsequent measurements established properties compatible with the Standard Model Higgs boson. The 2013 Nobel Prize recognized Englert and Higgs for the theoretical mechanism. [Observation of a new particle in the search for the Standard Model Higgs boson with the ATLAS detector at the LHC (2012)](https://doi.org/10.1016/j.physletb.2012.08.020) · [Observation of a new boson at a mass of 125 GeV with the CMS experiment at the LHC (2012)](https://doi.org/10.1016/j.physletb.2012.08.021) · [Higgs Boson Physics, Status of (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-higgs-boson.pdf)



**Worked example.** For v=246.22 GeV and electron rest energy 0.51099895069 MeV, the tree-level estimate yₑ=√2mₑ/v is 2.94×10⁻⁶. The tiny dimensionless number is a coupling, not an amount of energy.

[Contents]({{< relref "books/mass-light/_index.md" >}}) · [Previous chapter](../mass/) · [Next chapter](../qcd/)
