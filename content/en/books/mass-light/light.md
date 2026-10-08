---
title: 8. What is light? From rays to Maxwell
date: '2026-10-08T00:00:00+03:00'
weight: 8
showPagination: false
description: A wave amplitude can have positive, negative or complex phase. Intensity
  is proportional to the squared amplitude. Coherent amplitudes add before squaring;
  independent intensities add after averaging. Angles in Snell’s law are mea
---

## From amplitudes to intensity

A wave amplitude can have positive, negative or complex phase. Intensity is proportional to the squared amplitude. Coherent amplitudes add before squaring; independent intensities add after averaging. Angles in Snell’s law are measured from the surface normal. The source-free vacuum equations below assume no charges and no currents.


{{< reader-figure "original/em_spectrum_en.png" "The electromagnetic spectrum." >}}

## 8.1 Level 1: geometric optics

When wavelengths are much smaller than apertures and obstacles, light is efficiently described by rays. Reflection obeys

{{< reader-math "block" >}}\theta_i=\theta_r,{{< /reader-math >}}

and Snell’s law is

{{< reader-math "block" >}}n_1\sin\theta_1=n_2\sin\theta_2.{{< /reader-math >}}

Geometric optics is an approximation to wave propagation, not evidence that light is made of rigid microscopic pellets.

## 8.2 Level 2: interference and diffraction

Young’s interference experiments established the power of a wave description. For two coherent paths with phase difference {{< reader-math "inline" >}}\Delta\phi{{< /reader-math >}}, equal-amplitude fields produce

{{< reader-math "block" >}}I\propto|E_1+E_2|^2
=2E_0^2(1+\cos\Delta\phi).{{< /reader-math >}}

This cross term distinguishes coherent wave amplitudes from a simple classical addition of intensities. [The Bakerian Lecture: On the theory of light and colours (1802)](https://doi.org/10.1098/rstl.1802.0004)

{{< reader-figure "original/double_slit_en.png" "A simple double-slit interference pattern." >}}

Polarization further shows that electromagnetic radiation has transverse degrees of freedom. Classical wave optics correctly predicts a vast domain of diffraction, interference, imaging, Fourier optics, and polarization phenomena.

## 8.3 Level 3: Maxwell’s electromagnetic wave

In vacuum, Maxwell’s equations are

{{< reader-math "block" >}}\nabla\cdot\mathbf{E}=0,{{< /reader-math >}}

{{< reader-math "block" >}}\nabla\cdot\mathbf{B}=0,{{< /reader-math >}}

{{< reader-math "block" >}}\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},{{< /reader-math >}}

{{< reader-math "block" >}}\nabla\times\mathbf{B}=\mu_0\epsilon_0\frac{\partial\mathbf{E}}{\partial t}.{{< /reader-math >}}

Taking another curl yields the wave equation

{{< reader-math "block" >}}\nabla^2\mathbf{E}-\mu_0\epsilon_0\frac{\partial^2\mathbf{E}}{\partial t^2}=0,{{< /reader-math >}}

and similarly for {{< reader-math "inline" >}}\mathbf B{{< /reader-math >}}, with wave speed

{{< reader-math "block" >}}c=\frac{1}{\sqrt{\mu_0\epsilon_0}}.{{< /reader-math >}}

Maxwell recognized that the calculated electromagnetic wave speed agreed with the measured speed of light, leading to the electromagnetic theory of light. [A Dynamical Theory of the Electromagnetic Field (1865)](https://doi.org/10.1098/rstl.1865.0008)

In modern SI, the speed of light is defined exactly as

{{< reader-math "block" >}}c=299\,792\,458\ \mathrm{m\,s^{-1}}.{{< /reader-math >}}

The Planck constant and elementary charge are also exact SI defining constants:

{{< reader-math "block" >}}h=6.62607015\times10^{-34}\ \mathrm{J\,s},{{< /reader-math >}}

{{< reader-math "block" >}}e=1.602176634\times10^{-19}\ \mathrm{C}.{{< /reader-math >}}

[CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants)

## 8.4 Ether and Michelson-Morley

Nineteenth-century physicists often assumed that a mechanical wave required a medium, so an electromagnetic “luminiferous ether” was proposed. The Michelson-Morley experiment found no expected leading second-order directional ether-wind signal within its sensitivity and became one of the historically important constraints on ether models. [On the Relative Motion of the Earth and the Luminiferous Ether (1887)](https://doi.org/10.2475/ajs.s3-34.203.333)

It is an oversimplification to say that one experiment single-handedly “proved the ether does not exist.” The deeper replacement came from a new spacetime kinematics: special relativity and Lorentz invariance.



[Contents]({{< relref "books/mass-light/_index.md" >}}) · [Previous chapter](../early-universe/) · [Next chapter](../photons/)
