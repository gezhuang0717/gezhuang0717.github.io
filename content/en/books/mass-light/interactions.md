---
title: 6. Gauge symmetry and the four fundamental interactions
date: '2026-10-08T00:00:00+03:00'
weight: 6
showPagination: false
description: A global symmetry uses the same transformation everywhere. A gauge description
  permits position-dependent choices of field variables while measurable predictions
  remain unchanged. Gauge redundancy is not a second physical state of
---

## What a symmetry changes

A global symmetry uses the same transformation everywhere. A gauge description permits position-dependent choices of field variables while measurable predictions remain unchanged. Gauge redundancy is not a second physical state of the experiment. Covariant derivatives combine ordinary derivatives with gauge fields. Gravity is described by spacetime geometry in general relativity and is outside the Standard Model gauge group.


## 6.1 What “gauge symmetry” really means

A gauge symmetry is not a geometric ball living in ordinary space. {{< reader-math "inline" >}}U(1){{< /reader-math >}}, {{< reader-math "inline" >}}SU(2){{< /reader-math >}}, and {{< reader-math "inline" >}}SU(3){{< /reader-math >}} are Lie groups acting on internal field degrees of freedom. Their dimensions are

{{< reader-math "block" >}}\dim U(1)=1,{{< /reader-math >}}

{{< reader-math "block" >}}\dim SU(2)=3,{{< /reader-math >}}

{{< reader-math "block" >}}\dim SU(3)=8.{{< /reader-math >}}

This is why the unbroken {{< reader-math "inline" >}}U(1){{< /reader-math >}} electromagnetic theory has one gauge field, the electroweak {{< reader-math "inline" >}}SU(2){{< /reader-math >}} has three weak-isospin gauge fields before mixing, and QCD has eight gluon gauge fields. Saying “SU(3) is an eight-dimensional sphere” is mathematically false. [Conservation of Isotopic Spin and Isotopic Gauge Invariance (1954)](https://doi.org/10.1103/PhysRev.96.191) · [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

The Yang-Mills field strength is

{{< reader-math "block" >}}F^a_{\mu\nu}=\partial_\mu A^a_\nu-\partial_\nu A^a_\mu
+g f^{abc}A^b_\mu A^c_\nu.{{< /reader-math >}}

The last term, absent in ordinary Abelian electromagnetism, makes the gauge bosons interact with each other and is central to non-Abelian dynamics.

## 6.2 Electromagnetism

The electromagnetic coupling strength at low energy is characterized by the dimensionless fine-structure constant

{{< reader-math "block" >}}\alpha=\frac{e^2}{4\pi\epsilon_0\hbar c},{{< /reader-math >}}

with 2022 CODATA

{{< reader-math "block" >}}\alpha^{-1}=137.035999177(21).{{< /reader-math >}}

[CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants)

Because the photon is massless, static electromagnetic fields can be long ranged. In vacuum the Coulomb potential behaves as {{< reader-math "inline" >}}V(r)\propto1/r{{< /reader-math >}}.

## 6.3 Weak interaction

At energies far below {{< reader-math "inline" >}}M_W{{< /reader-math >}}, weak processes can be approximated by the Fermi theory with coupling

{{< reader-math "block" >}}G_F\approx1.166\times10^{-5}\ \mathrm{GeV}^{-2}.{{< /reader-math >}}

In the full electroweak theory, charged-current weak interactions are mediated by {{< reader-math "inline" >}}W^\pm{{< /reader-math >}} and neutral currents by {{< reader-math "inline" >}}Z^0{{< /reader-math >}}. Their large masses lead to short-range effective interactions at low energies. The rough length scale

{{< reader-math "block" >}}\ell_W\sim\frac{\hbar c}{M_Wc^2}{{< /reader-math >}}

is about {{< reader-math "inline" >}}2.5\times10^{-18}\,\mathrm{m}{{< /reader-math >}}, but the weak interaction range should not be derived by saying that the boson “borrows energy for a time {{< reader-math "inline" >}}\Delta t\sim\hbar/\Delta E{{< /reader-math >}}.” Internal virtual propagators are not particles temporarily violating energy conservation. [Electroweak Model and Constraints on New Physics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf)

## 6.4 Strong interaction

QCD is also mediated by massless gauge bosons, yet confinement prevents the observation of long-range color-Coulomb fields between isolated colored sources. Residual strong interactions between color-singlet hadrons are short ranged and can be described at nuclear scales in terms of meson exchange and effective field theories. Thus “massless mediator = automatically infinite-range observable force” is not a universal rule in an interacting gauge theory.

## 6.5 Gravity

Classical gravity is described by general relativity, not the Standard Model. Newton’s constant is

{{< reader-math "block" >}}G=6.67430(15)\times10^{-11}\ \mathrm{m^3\,kg^{-1}\,s^{-2}},{{< /reader-math >}}

with a relative uncertainty far larger than that of electromagnetic constants. Combining {{< reader-math "inline" >}}G{{< /reader-math >}}, {{< reader-math "inline" >}}\hbar{{< /reader-math >}}, and {{< reader-math "inline" >}}c{{< /reader-math >}} defines the Planck energy

{{< reader-math "block" >}}E_P=\sqrt{\frac{\hbar c^5}{G}}
=1.220890(14)\times10^{19}\ \mathrm{GeV}.{{< /reader-math >}}

[CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants)

The Planck scale indicates where quantum-gravity effects are expected to become unavoidable on dimensional grounds; it is not proof that all forces literally merge at exactly {{< reader-math "inline" >}}E_P{{< /reader-math >}}.



[Contents]({{< relref "books/mass-light/_index.md" >}}) · [Previous chapter](../qcd/) · [Next chapter](../early-universe/)
