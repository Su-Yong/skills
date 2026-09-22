# Merucav CPU renderer: source, modifications, and licenses

Pinned upstream: https://github.com/Northstrix/merucav/tree/b543416e23d5ccd5b6fa84628e483a16ae34c9ca

The 57 styles, defaults and UI limits come from `src/components/gradient/gradient-canvas.tsx`,
`gradient-properties-editor.tsx`, and the English labels in `src/lib/i18n.ts`.
The corresponding GLSL sources are retained in `merucav-original-shaders.json`.

## Local modifications

- 56 fragment shaders were converted ahead of time with glsl-transpiler 3.0.3.
  The generated JavaScript and uniform bindings are bundled. No compiler, npm
  install, browser, GPU, or network is needed to execute the image generator.
- GLSL 300 declarations, array swizzles, matrix compound assignments, vector copy
  semantics, transpose typing and per-fragment globals are adapted for CPU use.
  Vector arithmetic uses JavaScript numbers. Screen derivatives use neighboring
  samples; texture noise uses a fixed seed and repeat/bilinear sampling.
- Psychedelic Flower Tunnel's light structs were inlined to their equivalent
  diffuse expression; its computed but unused specular term was removed.
- Cosmic City retains the original procedural city geometry in
  `merucav-city-geometry.mjs`. CPU projection, Screen/additive blending, five
  deterministic history frames, bloom blur and color finishing approximate the
  original Three.js rendering. This is not a pixel-identical WebGL implementation.
- Neural Noise's millisecond clock is derived from seconds and its speed control.
- Swirl's noisy base is clamped to zero before fractional powers to avoid undefined
  negative-base results when its parameters are randomized.
- PNG encoding, layering, parameter validation and random selection are local code.

## Upstream licensing scope

Merucav declares its application MIT, but explicitly states that individual shaders
may have other licenses. Its credits and supplied shader license texts are retained
below. Some upstream shader sources use CC BY-NC-SA terms; do not treat the entire
shader collection as MIT. Original credit URLs remain provenance links only.

## Merucav application license

MIT License

Copyright (c) 2026 Maxim Bortnikov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Upstream credits and disclosure

## Credit

[GradientGen](https://github.com/noegarsoux/GradientGen) by [noegarsoux](https://github.com/noegarsoux)

[Velustro](https://uvcanvas.com/docs/components/velustro) by [UVCanvas](https://uvcanvas.com/)

[Tranquiluxe](https://uvcanvas.com/docs/components/tranquiluxe) by [UVCanvas](https://uvcanvas.com/)

[Shader Art Coding Introduction](https://www.shadertoy.com/view/mtyGWy) by [kishimisu](https://www.shadertoy.com/user/kishimisu)

[流尾4](https://www.shadertoy.com/view/tXSBD1) by [yufengjie](https://www.shadertoy.com/user/yufengjie)

[Kaleidoscope Beam](https://www.shadertoy.com/view/t3SfW1) by [jshguo](https://www.shadertoy.com/user/jshguo)

[Balatro Background Shaders](https://www.shadertoy.com/view/XXtBRr) by [xxidbr9](https://www.shadertoy.com/user/xxidbr9)

[Noise animation - Electric](https://www.shadertoy.com/view/ldlXRS) by [nimitz](https://www.shadertoy.com/user/nimitz)

[Particle Experiment 7](https://www.shadertoy.com/view/MddGWN) by [aiekick](https://www.shadertoy.com/user/aiekick)

[Novatrix](https://uvcanvas.com/docs/components/novatrix) by [UVCanvas](https://uvcanvas.com/)

[Voronoi - distances](https://www.shadertoy.com/view/ldl3W8) by [iq](https://www.shadertoy.com/user/iq)

[pulse](https://codepen.io/VaaLaa/pen/yyeQdMZ) by [Andrei V](https://codepen.io/VaaLaa)

[Truchet tiles](https://codepen.io/lekzd/pen/myPyoGM) by [Alexander Korotaev](https://codepen.io/lekzd)

[🌌 Pulsating Neon Shape GLSL](https://codepen.io/equant_org/pen/ByKxPrr) by [Fabio E Zola](https://codepen.io/equant_org)

[Harmonic Mandala in p5.js](https://codepen.io/VoXelo/pen/QwymLwW) by [Techartist](https://codepen.io/VoXelo)

[Non liquid glass](https://codepen.io/lekzd/pen/dPGYjdj) by [Alexander Korotaev](https://codepen.io/lekzd)

[Voronoi from Voronoi from Voronoi from Voronoi](https://codepen.io/lekzd/pen/JoYzXpR) by [Alexander Korotaev](https://codepen.io/lekzd)

[Floating voronoi lines](https://codepen.io/lekzd/pen/xbwMMzR) by [Alexander Korotaev](https://codepen.io/lekzd)

[grain gradient](https://shaders.paper.design/grain-gradient) by [Paper Shaders](https://shaders.paper.design/)

[swirl](https://shaders.paper.design/swirl) by [Paper Shaders](https://shaders.paper.design/)

[spiral](https://shaders.paper.design/spiral) by [Paper Shaders](https://shaders.paper.design/)

[shaders](https://github.com/paper-design/shaders) by [paper design](https://github.com/paper-design)

[Neuro Noise (GLSL Shader)](https://codepen.io/ksenia-k/pen/vYwgrWv) by [Ksenia Kondrashova](https://codepen.io/ksenia-k)

[Highway to Heaven](https://codepen.io/sabosugi/pen/azpqWKE) by [Sabo Sugi](https://codepen.io/sabosugi)

[Hall of Fractals](https://codepen.io/sabosugi/pen/gbgeXja) by [Sabo Sugi](https://codepen.io/sabosugi)

[Rails in Space](https://codepen.io/sabosugi/pen/xbgWXMP) by [Sabo Sugi](https://codepen.io/sabosugi)

[Inside UFO Spaceship](https://codepen.io/sabosugi/pen/XJpqjpo) by [Sabo Sugi](https://codepen.io/sabosugi)

[Fork B of - A space flower](https://www.shadertoy.com/view/tfBXzD) by [bennoH](https://www.shadertoy.com/user/bennoH)

[Golden Electric Spiral](https://www.shadertoy.com/view/csj3zt) by [SnoopethDuckDuck](https://www.shadertoy.com/user/SnoopethDuckDuck)

[yee1212](https://www.shadertoy.com/view/sldGRS) by [dspindler](https://www.shadertoy.com/user/dspindler)

[Starry planes](https://www.shadertoy.com/view/MfjyWK) by [mrange](https://www.shadertoy.com/user/mrange)

[Grid Attractor](https://www.shadertoy.com/view/43cBzn) by [takumifukasawa](https://www.shadertoy.com/user/takumifukasawa)

[Tunnel Cylinders](https://www.shadertoy.com/view/MlsfWS) by [balkhan](https://www.shadertoy.com/user/balkhan)

[psychedelic flower tunnel](https://www.shadertoy.com/view/WtsXzs) by [takumifukasawa](https://www.shadertoy.com/user/takumifukasawa)

[Falling Through the Sky](https://codepen.io/editor/sabosugi/pen/019fb43d-e522-7293-9ac9-9ca77a280155) by [Sabo Sugi](https://codepen.io/sabosugi)

[Disco Hive](https://www.shadertoy.com/view/7c3XRj) by [noztol](https://www.shadertoy.com/user/noztol)

[Disco Hexnel](https://www.shadertoy.com/view/fcdSDM) by [noztol](https://www.shadertoy.com/user/noztol)

[Kaleidoscope Wheels](https://www.shadertoy.com/view/fctXWM) by [noztol](https://www.shadertoy.com/user/noztol)

[Disco Fever](https://www.shadertoy.com/view/NftXzj) by [noztol](https://www.shadertoy.com/user/noztol)

[Fly in Particles CIty](https://codepen.io/editor/sabosugi/pen/019fd6d0-e2fe-7d58-a1c3-69c53d13b500) by [Sabo Sugi](https://codepen.io/sabosugi)

[Quantum Shapes](https://www.shadertoy.com/view/ff3SR4) by [noztol](https://www.shadertoy.com/user/noztol)

[Glass Origin](https://www.shadertoy.com/view/scS3Wy) by [Frostbyte_](https://www.shadertoy.com/user/Frostbyte_)

[Mandala Dice](https://www.shadertoy.com/view/NfG3zm) by [noztol](https://www.shadertoy.com/user/noztol)

[Rainbow Travel](https://www.shadertoy.com/view/f3XGWS) by [noztol](https://www.shadertoy.com/user/noztol)

[Cubic Spin](https://www.shadertoy.com/view/scV3DR) by [noztol](https://www.shadertoy.com/user/noztol)

[Formless](https://www.shadertoy.com/view/Ncy3R3) by [noztol](https://www.shadertoy.com/user/noztol)

[Inside Quantum Core](https://codepen.io/editor/sabosugi/pen/01a02fca-0d14-7e50-a9b8-283d419ccaea) by [Sabo Sugi](https://codepen.io/sabosugi)

[Neon Kaleidoscope](https://codepen.io/editor/sabosugi/pen/01a02f92-c5a4-7680-9919-88d6778ba369) by [Sabo Sugi](https://codepen.io/sabosugi)

[KuKo #243](https://www.shadertoy.com/view/wc3BDX) by [kukovisuals](https://www.shadertoy.com/user/kukovisuals)

[Whirlpool by @YoheiNishitsuji](https://www.shadertoy.com/view/wXV3zt) by [kukovisuals](https://www.shadertoy.com/user/kukovisuals)

[KuKo #365.2](https://www.shadertoy.com/view/scjSzK) by [kukovisuals](https://www.shadertoy.com/user/kukovisuals)

[Mandelbrot KuKo](https://www.shadertoy.com/view/X3fSDj) by [kukovisuals](https://www.shadertoy.com/user/kukovisuals)

[KuKo #351](https://www.shadertoy.com/view/fffXzl) by [kukovisuals](https://www.shadertoy.com/user/kukovisuals)

[Blobby World](https://www.shadertoy.com/view/7fVSDR) by [noztol](https://www.shadertoy.com/user/noztol)

[KuKo #363.3](https://www.shadertoy.com/view/NfjXWm) by [kukovisuals](https://www.shadertoy.com/user/kukovisuals)

[Color Picker](https://21st.dev/community/components/uplusion23/color-picker/color-picker-with-swatches-and-onchange) by [Trevor McIntire](https://21st.dev/community/uplusion23)

[vue-color-wheel](https://vue-color-wheel.vercel.app/) by [Robert Shaw](https://github.com/xiaoluoboding)

[Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)

[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)

[Wheel Picker](https://21st.dev/ncdai/wheel-picker/default) by [Chánh Đại](https://21st.dev/ncdai)

[React Wheel Picker](https://www.npmjs.com/package/@ncdai/react-wheel-picker) by [Chánh Đại](https://github.com/ncdai)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[framer-motion](https://www.npmjs.com/package/framer-motion)

[motion](https://www.npmjs.com/package/motion)

[AnimateIcons](https://animateicons.vercel.app/)

[i18next](https://www.npmjs.com/package/i18next)

[Lucide React](https://www.npmjs.com/package/lucide-react)

[uuid](https://www.npmjs.com/package/uuid)

[radix-ui](https://www.npmjs.com/package/radix-ui)

[Google Gemini](https://gemini.google.com/app)

[Anthropic's Claude Sonnet 5](https://claude.ai/)

[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox/default) by [Edil Ozi](https://21st.dev/Edil-ozi)

[チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Input Floating Label animation](https://codepen.io/Mahe76/pen/qBQgXyK) by [Elpeeda](https://codepen.io/Mahe76)

[Accordion](https://21st.dev/molecule-lab-rushil/accordion/default) by [Molecule UI](https://21st.dev/molecule-ui)

[View transitions - Demo](https://codepen.io/stefanjudis/pen/ByBbNGQ) by [Stefan Judis](https://codepen.io/stefanjudis)

### Shader Modification & Attribution Disclosure

Regarding the shaders distributed under the Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA 3.0 / CC BY-NC-SA 4.0) licenses:

These shaders have been modified, at the very least, to the extent necessary to run on Mercurav, and may have been further altered to have their appearance enhanced, remixed, or changed by modifying and/or extending the shaders' logic. 

Links to the original works are present in the "Credit" section of this [`README.md`](https://github.com/Northstrix/merucav/blob/main/README.md) and the "Credit & Info" section within [the web application](https://merucav.netlify.app/).
## uvcanvas / LICENSE.md

MIT License

Copyright (c) 2025 Latent Cat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Paper Shaders / LICENSE.txt

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.


## Paper Shaders / NOTICE.txt

Paper Shaders
Copyright 2026 Paper

Powered by Paper Shaders:
https://shaders.paper.design


## Kaleidoscope Beam / LICENSE.txt

// -----------------------------------------------------------------------------
//  Author: Joshua Guo - https://x.com/jshguo
//
//  Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
//  International License (CC BY-NC-SA 4.0). You must give appropriate credit,
//  provide a link to the license, indicate if changes were made, and you may not
//  use the material for commercial purposes. If you remix, transform, or build
//  upon this material, you must distribute your contributions under the same
//  license.
//  License: https://creativecommons.org/licenses/by-nc-sa/4.0/
// -----------------------------------------------------------------------------

## pulse / LICENSE.txt

Copyright (c) 2026 by Andrei V (https://codepen.io/VaaLaa/pen/yyeQdMZ)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Truchet tiles / LICENSE.txt

Copyright (c) 2026 by Alexander Korotaev (https://codepen.io/lekzd/pen/myPyoGM)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## 🌌 Pulsating Neon Shape GLSL / LICENSE.txt

Copyright (c) 2026 by Fabio E Zola (https://codepen.io/equant_org/pen/ByKxPrr)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Harmonic Mandala in p5.js / LICENSE.txt

Copyright (c) 2026 by Techartist (https://codepen.io/VoXelo/pen/QwymLwW)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Non liquid glass / LICENSE.txt

Copyright (c) 2026 by Alexander Korotaev (https://codepen.io/lekzd/pen/dPGYjdj)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Voronoi from Voronoi from Voronoi from Voronoi / LICENSE.txt

Copyright (c) 2026 by Alexander Korotaev (https://codepen.io/lekzd/pen/JoYzXpR)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Floating voronoi lines / LICENSE.txt

Copyright (c) 2026 by Alexander Korotaev (https://codepen.io/lekzd/pen/xbwMMzR)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Neuro Noise (GLSL Shader) / LICENSE.txt

Copyright (c) 2026 by Ksenia Kondrashova (https://codepen.io/ksenia-k/pen/vYwgrWv)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Highway to Heaven / LICENSE.txt

Copyright (c) 2026 by Sabo Sugi (https://codepen.io/sabosugi/pen/azpqWKE)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Hall of Fractals / LICENSE.txt

Copyright (c) 2026 by Sabo Sugi (https://codepen.io/sabosugi/pen/gbgeXja)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Rails in Space / LICENSE.txt

Copyright (c) 2026 by Sabo Sugi (https://codepen.io/sabosugi/pen/xbgWXMP)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Inside UFO Spaceship / LICENSE.txt

Copyright (c) 2026 by Sabo Sugi (https://codepen.io/sabosugi/pen/XJpqjpo)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Falling Through the Sky / LICENSE.txt

The MIT License (MIT)

Copyright (c) 2026 Sabo Sugi (https://codepen.io/editor/sabosugi/pen/019fb43d-e522-7293-9ac9-9ca77a280155)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Fly in Particles CIty / LICENSE.txt

Copyright (c) 2026 by Sabo Sugi (https://codepen.io/editor/sabosugi/pen/019fd6d0-e2fe-7d58-a1c3-69c53d13b500)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



## Glass Origin / LICENSE.txt

// -----------------------------------------------------------------------------
//  Author: Frostbyte_ - https://www.shadertoy.com/user/Frostbyte_
//
//  Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
//  International License (CC BY-NC-SA 4.0). You must give appropriate credit,
//  provide a link to the license, indicate if changes were made, and you may not
//  use the material for commercial purposes. If you remix, transform, or build
//  upon this material, you must distribute your contributions under the same
//  license.
//  License: https://creativecommons.org/licenses/by-nc-sa/4.0/
// -----------------------------------------------------------------------------


## Inside Quantum Core / LICENSE.txt

The MIT License (MIT)

Copyright (c) 2026 Sabo Sugi (https://codepen.io/editor/sabosugi/pen/01a02fca-0d14-7e50-a9b8-283d419ccaea)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



## Neon Kaleidoscope / LICENSE.txt

The MIT License (MIT)

Copyright (c) 2026 Sabo Sugi (https://codepen.io/editor/sabosugi/pen/01a02f92-c5a4-7680-9919-88d6778ba369)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



## glsl-transpiler 3.0.3

Source: https://github.com/stackgl/glsl-transpiler
Package author: Dmitry Yv <df.creative@gmail.com>.
Contributor listed by the package: Xiaoji Chen.
The package declares MIT. Generated vector/matrix and math helpers are derived
from its `lib/stdlib.js` and `lib/operators.js`; no parser/compiler runs here.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
