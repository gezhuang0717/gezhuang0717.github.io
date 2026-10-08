---
title: 9. Photons, quantum electrodynamics, and wave-particle language
date: '2026-10-08T00:00:00+03:00'
weight: 9
showPagination: false
description: Ordinary frequency ν counts cycles per second; angular frequency ω=2πν
  is in radians per second. Vacuum wavelength obeys λν=c. A detector absorbs energy
  locally in events, while a quantum state may contain amplitudes over many pat
---

## Frequency, wavelength and detection

Ordinary frequency ν counts cycles per second; angular frequency ω=2πν is in radians per second. Vacuum wavelength obeys λν=c. A detector absorbs energy locally in events, while a quantum state may contain amplitudes over many paths. In the simple one-photon photoelectric model, hν below the work function produces no emission; it does not produce electrons with negative kinetic energy.


## 9.1 Planck-Einstein quantization

Electromagnetic radiation exchanges energy in quanta with

{{< reader-math "block" >}}E=h\nu=\hbar\omega.{{< /reader-math >}}

Einstein’s 1905 light-quantum paper used this idea to explain the photoelectric effect. [\"Uber einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt (1905)](https://doi.org/10.1002/andp.19053220607)

For a simple metal photoemission model,

{{< reader-math "block" >}}K_{\max}=h\nu-\Phi,{{< /reader-math >}}

where {{< reader-math "inline" >}}\Phi{{< /reader-math >}} is the work function. A threshold frequency appears:

{{< reader-math "block" >}}\nu_0=\frac{\Phi}{h}.{{< /reader-math >}}

Above threshold, increasing intensity generally increases the number of emitted photoelectrons; the maximum kinetic energy is controlled primarily by frequency, not intensity. Therefore the statement “the photoelectric effect is completely independent of intensity” is false.

{{< reader-figure "original/photoelectric_en.png" "Photoelectric threshold relation." >}}

## 9.2 Momentum and Compton scattering

A photon has energy and momentum

{{< reader-math "block" >}}E=pc=\frac{hc}{\lambda},{{< /reader-math >}}

and Compton scattering gives the wavelength shift

{{< reader-math "block" >}}\Delta\lambda=\frac{h}{m_ec}(1-\cos\theta).{{< /reader-math >}}

The electron Compton wavelength is

{{< reader-math "block" >}}\lambda_C=\frac{h}{m_ec}\approx2.42631\times10^{-12}\ \mathrm{m}.{{< /reader-math >}}

The measured Compton effect strongly reinforced the quantum description of radiation. [A Quantum Theory of the Scattering of X-rays by Light Elements (1923)](https://doi.org/10.1103/PhysRev.21.483) · [CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants)

## 9.3 “Wave-particle duality” is historical shorthand

Modern quantum theory does not require imagining a photon as a little classical particle that sometimes transforms into a classical wave. Quantum states evolve according to amplitudes, and measurement statistics show interference as well as discrete detection events. In quantum field theory, the electromagnetic field is fundamental and photons are its quanta. The classical Maxwell field arises as an appropriate large-occupation/coherent-state limit.

## 9.4 Quantizing the electromagnetic field

Dirac’s 1927 theory of radiation emission and absorption was a foundational step toward QED. [The quantum theory of the emission and absorption of radiation (1927)](https://doi.org/10.1098/rspa.1927.0039)

The compact QED Lagrangian is

{{< reader-math "block" >}}\mathcal L_{\mathrm{QED}}
=\bar\psi(i\gamma^\mu D_\mu-m)\psi
-\frac14F_{\mu\nu}F^{\mu\nu},{{< /reader-math >}}

with

{{< reader-math "block" >}}D_\mu=\partial_\mu+ieA_\mu.{{< /reader-math >}}

Local {{< reader-math "inline" >}}U(1){{< /reader-math >}} gauge invariance organizes the interaction between charged fermions and the electromagnetic gauge field.

## 9.5 A photon is not the universal smallest amount of energy

A photon’s energy depends continuously on frequency:

{{< reader-math "block" >}}E_\gamma=h\nu.{{< /reader-math >}}

As {{< reader-math "inline" >}}\nu\rightarrow0{{< /reader-math >}}, the photon energy can become arbitrarily small in principle. Therefore there is no universal fixed “one-photon minimum energy of the universe.” Quantization means that a given field mode changes occupation in integer quanta {{< reader-math "inline" >}}n\hbar\omega{{< /reader-math >}}; it does not impose a single nonzero minimum energy valid for all frequencies.

Nor are photons the endpoint of every decay. Stable massive particles exist: the electron is stable to extraordinarily long experimental limits, and the lightest neutrino mass eigenstate may be stable. Many processes end in neutrinos or other stable particles as well as photons. [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)



**Worked example.** A 500 nm vacuum photon has energy 2.47968 eV. For an illustrative work function Φ=2.00 eV, this model gives Kmax=0.47968 eV. Below threshold, the one-photon process does not emit an electron.

[Contents]({{< relref "books/mass-light/_index.md" >}}) · [Previous chapter](../light/) · [Next chapter](../spacetime/)
