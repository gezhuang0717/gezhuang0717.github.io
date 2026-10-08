---
title: 10. Light and spacetime
date: '2026-10-08T00:00:00+03:00'
weight: 10
showPagination: false
description: Proper time is the time measured by a clock along its own timelike worldline.
  Coordinate time belongs to a chosen frame. The sign convention here is (+,−,−,−).
  A null interval has zero proper time, but no inertial observer is at r
---

## Whose clock and whose distance?

Proper time is the time measured by a clock along its own timelike worldline. Coordinate time belongs to a chosen frame. The sign convention here is (+,−,−,−). A null interval has zero proper time, but no inertial observer is at rest with a photon. The Doppler formula below describes radial recession in flat spacetime; cosmological redshift uses the scale factor instead.


## 10.1 The invariant interval

In flat spacetime,

{{< reader-math "block" >}}ds^2=c^2dt^2-dx^2-dy^2-dz^2.{{< /reader-math >}}

For a massive particle following a timelike trajectory,

{{< reader-math "block" >}}c^2d\tau^2=ds^2>0,{{< /reader-math >}}

where {{< reader-math "inline" >}}d\tau{{< /reader-math >}} is proper time. For light,

{{< reader-math "block" >}}ds^2=0.{{< /reader-math >}}

Thus an ideal null worldline has zero proper-time interval.

{{< reader-figure "original/light_cone_en.png" "Light cone and null trajectories." >}}

## 10.2 Why “from the photon’s point of view” is dangerous

The Lorentz factor

{{< reader-math "block" >}}\gamma=\frac{1}{\sqrt{1-v^2/c^2}}{{< /reader-math >}}

diverges as {{< reader-math "inline" >}}v\rightarrow c{{< /reader-math >}}. No inertial Lorentz frame exists in which a photon is at rest. It is therefore not physically legitimate to transform into “the photon’s reference frame” and ask what the photon sees. [Zur Elektrodynamik bewegter K\"orper (1905)](https://doi.org/10.1002/andp.19053221004)

A scientifically correct but still poetic sentence is:

> Light follows null trajectories for which the spacetime proper-time interval vanishes, but relativity does not define a photon rest frame.

That is the rigorous content behind the popular phrase “light does not experience time.”

## 10.3 Frequency is observer dependent

Although {{< reader-math "inline" >}}c{{< /reader-math >}} is invariant in vacuum, photon frequency is not. For a source moving directly away at speed {{< reader-math "inline" >}}v=\beta c{{< /reader-math >}}, the relativistic Doppler factor is

{{< reader-math "block" >}}\frac{\nu_{\mathrm{obs}}}{\nu_{\mathrm{em}}}
=\sqrt{\frac{1-\beta}{1+\beta}}.{{< /reader-math >}}

Cosmological redshift is different in origin and is commonly written

{{< reader-math "block" >}}1+z=\frac{a(t_0)}{a(t_{\mathrm{em}})},{{< /reader-math >}}

where {{< reader-math "inline" >}}a(t){{< /reader-math >}} is the cosmological scale factor.



[Contents]({{< relref "books/mass-light/_index.md" >}}) · [Previous chapter](../photons/) · [Next chapter](../superconductivity/)
