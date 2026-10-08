---
title: '1. The hierarchy of matter: atom, nucleus, nucleon, field'
date: '2026-10-08T00:00:00+03:00'
weight: 1
showPagination: false
description: An atom is a quantum bound system, not a solid bead. “Radius” usually
  describes a distribution or a characteristic scale. A femtometre is 10⁻¹⁵ m; a nanometre
  is 10⁻⁹ m. The nucleus holds almost all the atomic mass, while the elec
---

## Start with the scales

An atom is a quantum bound system, not a solid bead. “Radius” usually describes a distribution or a characteristic scale. A femtometre is 10⁻¹⁵ m; a nanometre is 10⁻⁹ m. The nucleus holds almost all the atomic mass, while the electron cloud sets most of the atomic size. In field equations below, ℏ=c=1 is used unless SI units are shown.


## 1.1 Atoms are mostly not “solid little balls”

A typical atom has a size of order {{< reader-math "inline" >}}10^{-10}\,\mathrm{m}{{< /reader-math >}}, whereas a nucleus is of order {{< reader-math "inline" >}}10^{-15}{{< /reader-math >}} to {{< reader-math "inline" >}}10^{-14}\,\mathrm{m}{{< /reader-math >}}. The electron is experimentally consistent with being pointlike down to distances far smaller than atomic scales, while the proton has an extended charge distribution with a characteristic radius of order {{< reader-math "inline" >}}0.84\,\mathrm{fm}{{< /reader-math >}}. These statements already tell us that ordinary matter is organized across many orders of magnitude rather than built from miniature classical spheres. [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

The mass hierarchy is just as striking. The 2022 CODATA recommended electron rest-energy equivalent is

{{< reader-math "block" >}}m_ec^2=0.510\,998\,950\,69(16)\ \mathrm{MeV},{{< /reader-math >}}

while the proton and neutron values are

{{< reader-math "block" >}}m_pc^2=938.272\,089\,43(29)\ \mathrm{MeV},{{< /reader-math >}}

{{< reader-math "block" >}}m_nc^2=939.565\,421\,94(48)\ \mathrm{MeV}.{{< /reader-math >}}

Thus

{{< reader-math "block" >}}\frac{m_p}{m_e}=1836.152\,673\,426(32).{{< /reader-math >}}

The exact numerical values and uncertainties are from the 2022 CODATA adjustment maintained by NIST. [CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants) · [Fundamental Physical Constants: 2022 CODATA Recommended Values (2024)](https://physics.nist.gov/cuu/Constants/)

For a neutral atom with mass number {{< reader-math "inline" >}}A{{< /reader-math >}}, the atomic mass is therefore dominated by the nucleus. Electron rest masses contribute only at the level of roughly {{< reader-math "inline" >}}Z m_e/(A m_N){{< /reader-math >}}, typically below one part in a thousand for ordinary nuclei, although atomic binding energies and nuclear binding energies matter whenever precision masses are discussed.

## 1.2 Protons and neutrons are not elementary

The proton has valence quark content {{< reader-math "inline" >}}uud{{< /reader-math >}} and the neutron {{< reader-math "inline" >}}udd{{< /reader-math >}}. The phrase “valence quarks” is important: a nucleon state in QCD also contains a dynamical sea of quark-antiquark excitations and gluons. The light-quark mass parameters themselves are only a few MeV in the conventional {{< reader-math "inline" >}}\overline{\mathrm{MS}}{{< /reader-math >}} scheme at a reference renormalization scale, and quark masses are not directly observable in isolation because quarks are confined. Any numerical quark mass must therefore be quoted together with a definition, scheme, and scale. [Quark Masses (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-quark-masses.pdf)

This is the first major conceptual lesson of the book:

> **The mass of a composite quantum system is not generally the arithmetic sum of the rest masses of named constituents.**

The total rest energy of a bound relativistic quantum field configuration includes kinetic energy, field energy, interaction energy, vacuum polarization, symmetry-breaking effects, and renormalized operator contributions. For nuclei there is an additional nuclear binding-energy correction; for atoms there are still smaller electronic binding corrections.

## 1.3 Fields are more fundamental than particle pictures in modern theory

The Standard Model is a relativistic quantum field theory. In that language an electron is not best imagined as a tiny bead moving through an independently existing “electron field.” The electron is a quantum excitation of the electron field. A photon is an excitation of the electromagnetic gauge field. Quarks are excitations of quark fields, and gluons are excitations of the non-Abelian {{< reader-math "inline" >}}SU(3)_C{{< /reader-math >}} gauge field. [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

A free scalar field illustrates the idea. A simple Lagrangian density is

{{< reader-math "block" >}}\mathcal{L}=\frac12\partial_\mu\phi\,\partial^\mu\phi-
\frac12m^2\phi^2.{{< /reader-math >}}

Quantization promotes the field and its conjugate momentum to operators. Normal modes behave like quantum harmonic oscillators, and what we call “particles” correspond to quantized excitations of those modes. This is why saying “particles are field excitations” is much closer to modern theory than saying “particles are little wave packets that happen to ride on fields.”

## 1.4 Vacuum expectation value is not the same thing as vacuum energy

A recurring source of popular-science confusion is the phrase “vacuum expectation value.” For an operator {{< reader-math "inline" >}}\hat O{{< /reader-math >}} in the vacuum state {{< reader-math "inline" >}}|0\rangle{{< /reader-math >}},

{{< reader-math "block" >}}\langle O\rangle_0=\langle0|\hat O|0\rangle.{{< /reader-math >}}

A field may have {{< reader-math "inline" >}}\langle\phi\rangle=0{{< /reader-math >}} while still possessing quantum fluctuations and zero-point structure. Conversely, a field may have a nonzero expectation value without that statement meaning that other fields “borrow energy” from it. Vacuum expectation values, vacuum energy density, and virtual fluctuations are distinct concepts. The Higgs mechanism must therefore not be described as particles absorbing packets of energy from an energetic Higgs background.



[Contents]({{< relref "books/mass-light/_index.md" >}}) · [Next chapter](../standard-model/)
