---
title: Appendix D. Problems and selected solutions
date: '2026-10-08T00:00:00+03:00'
weight: 104
showPagination: false
description: Using m_pc^2=938.27208943\,\mathrm{MeV} and m_ec^2=0.51099895069\,\mathrm{MeV},
  calculate m_p/m_e and compare with the CODATA ratio.
reader_supplement: true
---

## Problem 1 — Electron versus proton mass

Using {{< reader-math "inline" >}}m_pc^2=938.27208943\,\mathrm{MeV}{{< /reader-math >}} and {{< reader-math "inline" >}}m_ec^2=0.51099895069\,\mathrm{MeV}{{< /reader-math >}}, calculate {{< reader-math "inline" >}}m_p/m_e{{< /reader-math >}} and compare with the CODATA ratio.

**Solution.**

{{< reader-math "block" >}}\frac{m_p}{m_e}
=\frac{938.27208943}{0.51099895069}
\approx1836.15267,{{< /reader-math >}}

consistent with the CODATA value within the rounding used here. [CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants)

## Problem 2 — Photon energy

Find the energy of a {{< reader-math "inline" >}}500\,\mathrm{nm}{{< /reader-math >}} photon.

**Solution.**

{{< reader-math "block" >}}E=\frac{hc}{\lambda}
\approx\frac{1239.841984\,\mathrm{eV\,nm}}{500\,\mathrm{nm}}
\approx2.48\,\mathrm{eV}.{{< /reader-math >}}

## Problem 3 — Weak length scale

Estimate {{< reader-math "inline" >}}\hbar c/M_Wc^2{{< /reader-math >}} using {{< reader-math "inline" >}}M_W\approx80.4\,\mathrm{GeV}{{< /reader-math >}}.

**Solution.**

{{< reader-math "block" >}}\ell_W\sim\frac{0.1973\,\mathrm{GeV\,fm}}{80.4\,\mathrm{GeV}}
\approx2.45\times10^{-3}\,\mathrm{fm}
=2.45\times10^{-18}\,\mathrm m.{{< /reader-math >}}

This is only an order-of-magnitude range estimate; weak amplitudes are computed from propagators, not from a literal finite flight path of a virtual {{< reader-math "inline" >}}W{{< /reader-math >}} boson.

## Problem 4 — Higgs Yukawa coupling of the electron

Estimate the electron Yukawa coupling using {{< reader-math "inline" >}}m_e=y_ev/\sqrt2{{< /reader-math >}} and {{< reader-math "inline" >}}v=246.22\,\mathrm{GeV}{{< /reader-math >}}.

**Solution.**

{{< reader-math "block" >}}y_e=\frac{\sqrt2m_e}{v}
\approx2.94\times10^{-6}.{{< /reader-math >}}

The smallness of this dimensionless number is part of the unexplained flavor hierarchy.

## Problem 5 — QCD crossover temperature in kelvin

Use {{< reader-math "inline" >}}k_B=8.617333262\ldots\times10^{-5}\,\mathrm{eV/K}{{< /reader-math >}} to convert {{< reader-math "inline" >}}156.5\,\mathrm{MeV}{{< /reader-math >}} to kelvin.

**Solution.**

{{< reader-math "block" >}}T\approx\frac{156.5\times10^6\,\mathrm{eV}}
{8.617333262\times10^{-5}\,\mathrm{eV/K}}
\approx1.82\times10^{12}\,\mathrm K.{{< /reader-math >}}

[CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants) · [Chiral crossover in QCD at zero and non-zero chemical potentials (2019)](https://doi.org/10.1016/j.physletb.2019.05.013)

## Problem 6 — Why a photon has no rest frame

Show that the Lorentz factor diverges as {{< reader-math "inline" >}}v\to c{{< /reader-math >}}.

**Solution.** Since {{< reader-math "inline" >}}1-v^2/c^2\to0^+{{< /reader-math >}},

{{< reader-math "block" >}}\gamma=(1-v^2/c^2)^{-1/2}\to\infty.{{< /reader-math >}}

A finite Lorentz boost cannot transform an inertial observer into a lightlike rest frame.



[Contents]({{< relref "books/mass-light/_index.md" >}})
