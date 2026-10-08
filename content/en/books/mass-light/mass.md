---
title: 3. Mass and energy in relativity
date: '2026-10-08T00:00:00+03:00'
weight: 3
showPagination: false
description: Invariant mass is the same for every inertial observer. Momentum and
  total energy change under a change of frame. Write E₀=mc² for rest energy and K=E−E₀
  for kinetic energy. In natural units one often writes a mass in GeV; in SI t
---

## Mass, momentum and units

Invariant mass is the same for every inertial observer. Momentum and total energy change under a change of frame. Write E₀=mc² for rest energy and K=E−E₀ for kinetic energy. In natural units one often writes a mass in GeV; in SI the corresponding mass unit is GeV/c². For a composite system, add both energies and momenta before calculating its invariant mass.


## 3.1 The full energy-momentum relation

The famous expression {{< reader-math "inline" >}}E=mc^2{{< /reader-math >}} is the rest-frame special case of

{{< reader-math "block" >}}E^2=p^2c^2+m^2c^4.{{< /reader-math >}}

For a particle at rest, {{< reader-math "inline" >}}p=0{{< /reader-math >}} and therefore

{{< reader-math "block" >}}E_0=mc^2.{{< /reader-math >}}

For a massless particle, {{< reader-math "inline" >}}m=0{{< /reader-math >}}, so

{{< reader-math "block" >}}E=pc.{{< /reader-math >}}

This is the form relevant to photons. Modern particle physics usually avoids the older language “relativistic mass” or “moving mass.” The invariant mass {{< reader-math "inline" >}}m{{< /reader-math >}} is frame-independent; energy and momentum transform as components of a four-vector. [Zur Elektrodynamik bewegter K\"orper (1905)](https://doi.org/10.1002/andp.19053221004) · [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

## 3.2 Natural units

High-energy physics commonly sets

{{< reader-math "block" >}}\hbar=c=1.{{< /reader-math >}}

Then energy, momentum, and mass are expressed in the same units, often eV, MeV, or GeV. To convert back, the extremely useful CODATA identity is

{{< reader-math "block" >}}\hbar c=197.3269804\ldots\ \mathrm{MeV\,fm},{{< /reader-math >}}

which is exact once the defining SI constants are used. [CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants)

For example a characteristic length scale associated with momentum transfer {{< reader-math "inline" >}}Q{{< /reader-math >}} is roughly

{{< reader-math "block" >}}\Delta x\sim\frac{\hbar c}{Q}.{{< /reader-math >}}

Thus {{< reader-math "inline" >}}Q=1\,\mathrm{GeV}{{< /reader-math >}} probes distances of order {{< reader-math "inline" >}}0.2\,\mathrm{fm}{{< /reader-math >}}, while {{< reader-math "inline" >}}Q=100\,\mathrm{GeV}{{< /reader-math >}} probes around {{< reader-math "inline" >}}2\times10^{-3}\,\mathrm{fm}{{< /reader-math >}}.

## 3.3 Composite mass is a rest-frame energy eigenvalue

For a closed composite system in its center-of-momentum frame,

{{< reader-math "block" >}}M c^2 = E_{\mathrm{total}}(\mathbf{P}=0).{{< /reader-math >}}

This equation is conceptually more reliable than “add the constituent masses.” A hydrogen atom weighs slightly less than a free proton plus free electron because its electromagnetic binding energy is negative. A bound nucleus weighs less than the corresponding free nucleons by its nuclear binding energy. A proton, however, is a relativistic strongly coupled QCD state, so its mass must be calculated from the QCD Hamiltonian or from correlation functions in lattice QCD rather than from a nonrelativistic constituent sum. [Revisiting the proton mass decomposition (2020)](https://doi.org/10.1103/PhysRevD.102.114042) · [Lattice-QCD Validation of Hadron Mass and Trace-Anomaly Decomposition Sum Rules (2026)](https://doi.org/10.1103/5n46-717z)



[Contents]({{< relref "books/mass-light/_index.md" >}}) · [Previous chapter](../standard-model/) · [Next chapter](../higgs/)
