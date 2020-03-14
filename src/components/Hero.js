import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { keyframes } from 'styled-components'

import coronavirus from '../img/coronavirus.svg'
import logoSlogan from '../img/logo-slogan.svg'
import { Button, Container as CntnrDefault } from '../style'

const Container = styled(CntnrDefault)`
  box-sizing: border-box; 
  width: 100%;
`

const svgData =
  "data:image/svg+xml,%3csvg viewBox='0 0 1834 445' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='1'%3e%3cpath fill='none' d='M0 0h1833v444H0z'/%3e%3cclipPath id='a'%3e%3cpath d='M0 0h1833v444H0z'/%3e%3c/clipPath%3e%3cg clip-path='url(%23a)' fill='%237c7c7c' fill-rule='nonzero'%3e%3cpath d='M48 269l6 3 1-2 3 2 1-1 2 1c1-2 1-5 4-6l1 1 2 3c1 0 0 0 0 0l1 1h-1l-3-3-2 3v1c-1 1-2 3-4 1v1h-3l-4-1h-1l-1-1-3-1c-2 1-2 5-4 5l-3-3a49 49 0 0 0-1-1l-1 1v-5l1 1 4 4 1-2 4-2zm11 4zm0 0zm-2 0zm0 0zm3-1zm-21-3c0 1 0 0 0 0zm25-2zm255 4h47l1 1h-60l-1-1h13zm425-165l223 2h1v1c-103-1-207-2-310-1h-58v-1l144-1z'/%3e%3cpath d='M81 82l133 1h12c8 2 13 10 15 16v5l1 48c0 63 1 126-1 189v7c-2 9-9 17-18 18H-9v-1h66l160-1h7c9-1 15-10 16-18v-15-196l-1-34c0-4-2-7-4-10-3-4-7-7-12-7h-41L-2 83h-5v-1h88z'/%3e%3cpath d='M46 100l156 1 1 1a4884 4884 0 0 1 1 246l-1 1h-6l-204 1h-2v-1c71 1 141-1 212-2v-3c1-80 0-159-2-238v-3l-211-2h-1v-1h57zm247 92v157l1 8a10 10 0 0 0 9 6l65 1a12 12 0 0 0 11-12c1-52 0-105-1-157l-1-9a10 10 0 0 0-9-6h-64a12 12 0 0 0-11 11v1zm-1-1a13 13 0 0 1 12-12l64-1a12 12 0 0 1 12 11l1 163a14 14 0 0 1-12 13h-66a11 11 0 0 1-11-11V191zm764-28a6671 6671 0 0 0 1 186l1 9a10 10 0 0 0 8 6l79 1a12 12 0 0 0 12-12c1-63 0-125-1-187l-1-10a10 10 0 0 0-9-6h-78a12 12 0 0 0-12 11v2zm0-2a13 13 0 0 1 12-12l73-1 9 1a12 12 0 0 1 7 11c2 63 2 125 1 187 0 4 1 8-1 11a14 14 0 0 1-12 8h-79a11 11 0 0 1-10-11c-2-64-1-128-1-191v-3zm602 21c-1 56 0 111 1 168v9a10 10 0 0 0 9 5l70 1a12 12 0 0 0 12-12c1-56 0-112-1-167l-1-11a10 10 0 0 0-9-6h-70a12 12 0 0 0-11 11v2zm-1-2a13 13 0 0 1 12-12l70-1a12 12 0 0 1 11 12 4463 4463 0 0 1 1 174 14 14 0 0 1-13 13h-70a11 11 0 0 1-11-11V180z'/%3e%3cpath d='M299 207l1 131h1l72-1V206h-74v1zm0-2a1823 1823 0 0 1 75 0h1v133c0 2-2 1-3 1h-73l-1-1V205h1zm762-29l1 163h2c29 1 58 0 88-1V176a3220 3220 0 0 0-91-1v1zm0-1a2140 2140 0 0 1 93 0v164l-1 1h-92l-1-1 1-164h1zm602 18v148h83l-1-139v-9l-82-1v1zm0-2a1935 1935 0 0 1 84 1v150l-2 1h-83V192v-1 1l1-1z'/%3e%3cpath d='M1067 194l1-1 73-1h7l1 1v46l-1 1h-80l-1-1v-5-40zm72 0h-71v16l1 12v16h78v-44h-8zm-56 54h30l9 1h22l1 1-1 1h-11l-50-1h-3l-12-1v-1h15zM436 51c-2 98-2 196-1 294l1 10c2 5 8 9 14 9l92 1c147 1 294 0 441-1 8 0 15-6 15-14a6304 6304 0 0 0-2-293c0-5 1-10-1-14-2-5-7-8-12-9l-352-1-175 1c-4 0-9-1-12 1a13 13 0 0 0-8 11v5zm-1-5a14 14 0 0 1 13-13c173-2 345-2 517 0h18a16 16 0 0 1 15 14 6294 6294 0 0 1 2 293c0 5 1 11-1 16a17 17 0 0 1-15 10l-209 1H608l-158-2c-8 0-15-7-16-15V184l1-133v-5z'/%3e%3cpath d='M449 51c0 98 0 197 2 295 2-2 8 3 8 0a45017 45017 0 0 0 519 1h7a4899 4899 0 0 0-1-299l-368-1H449v4zm2-5a67842 67842 0 0 1 535 1 4936 4936 0 0 1 1 296v4l-1 1h-8c-176 1-351 1-527-1h-1c-2-100-2-198-1-296v-5h2zm329 320a302 302 0 0 0 1 4c1 8 1 15 4 22l5 7a228 228 0 0 0 9 9c3 3 1 9-4 9H643l-7-1a5 5 0 0 1-1-8c5-4 11-8 14-13 2-2 2-6 3-9l2-20h1c-1 9-1 19-4 28-2 4-6 7-10 11-3 2-6 4-6 7a4 4 0 0 0 3 3l76 1h79l4-1c2-1 3-4 0-6l-11-12a25 25 0 0 1-4-12 232 232 0 0 1-2-19z'/%3e%3cpath d='M784 125l183 1h1v1H601v-1l183-1zm-111 18l296 1h1v1h-57l-313-1h-1l1-1h73zm295 17c-103 2-207 2-310 2h-58v-1h1l42-1h326zm-256 17l256 1h1l1 1h-1l-311-1h-59l1-1h112zm-112 18h369v1a17234 17234 0 0 1-311 1l-58-1h-1l1-1zm288 21h80l-309 2h-58l1-1h45l241-1zm-230 18l139 1h9l159 1h1v1l-137-1H643l-42-1v-1h57zM577 77l-1 1-88 2h-22l-1-1h1l7-1h10a7220 7220 0 0 1 94-1zm-39 16h39l-1 1H467l1-1h70zm-49 51l86 1h1-108l-1-1h22zm1 16l88 1-17 1h-77l-15-1h-1l1-1h21zm54 18h31l-16 1h-91v-1h76zm-54 95l88 1v1h-94l-15-1h-1 8l5-1h9zm47 17l37 1h1-17l-69 1h-7l-14-1h-1 1l7-1h62zm10 18h32l-1 1H469v-1h78zm126-56l294 2h1v1l-310-1h-58v-1l43-1h31zm294 18a8289 8289 0 0 1-308 5l-58-1v-1c123 0 244 0 365-4h1v1zm-622 11h21l-1 1h-58v-1h38zm-27 9h31l17 1-9 1h-42l-8-1h-1 1l4-1h7zm23 10l25 1-9 1h-43l-8-1h4l3-1h28zm4 10h21l-1 1h-59v-1h39zm-3 18v3l1 3h22l1-1v-4l-1-2-22-1-1 1v1zm-1-1a2 2 0 0 1 2-2h22c2 0 2 2 2 3v5s0 2-2 3l-22-1h-1c-2-1-1-5-1-8zM161 109c3 0 3 6 4 7s1 2 2 0v-1h4l-1 1c-1 0-1-2-2 1l-3 1-4-8c-1-1-6 15-11 9-2-2 0-6-1-9l-5 8c-1 2-3 4-4 3-2-1-2-3-2-5v-3c-3 3-4 8-9 6-2 0-3-2-3-4l-2 7-1 1-3-3-3-8v4l-2 3c-3 1-4-2-6-3l-3 3c-3 0-5-2-6-4-1-1-2 2-3 3l-2 3-1-1c-2-3-1-6-2-9 0 0-5 3-6 6h-1l1-2 5-5h2l2 7a17 17 0 0 1 1-2c1-1 3-3 4-2l5 4c1-2 2-5 6-3l3 3 2-7c0-2 2-4 3 0l1 4 2 6c1-4 1-8 3-10h2v1l2 6c1 1 3-1 5-2v-1l1-2a19 19 0 0 1 1-1h1c1-1 3-2 3 1l1 7 4-7c2-2 4-6 6-3s-2 8 2 10l1-1 6-9h1zm-69 2zm538-41h-1l-4-7c0 2 0 4-2 4-1 1-2 0-5-2 0 0-1 2-3 2-2 1-3-1-5-2-1-1-2 1-3 3l-1 1-1-2-1-3v-1c0-1 0-2-1-1l-5 3c0 1 0 0 0 0v1s-2 0 0-2 5-6 7-3l1 4s3-4 6-2l3 2c1-1 2-3 5-1l2 1c1-3 1-6 3-6 2-1 2 5 4 8l1-3 2-4h1l2 5c1 1 3 0 4-2l1-1a13 13 0 0 1 2-1c1-1 2-1 3 1v5l4-6c2-1 3-4 5-1 1 2-1 5 1 7l6-7 2-1c2 1 2 4 3 6l1-1h4l-2 1c-1-1-1 2-2 2-3 0-3-5-5-6-1-1-3 5-5 6-1 1-3 2-4-1l-1-5s-5 10-8 8c-2-2-1-4-1-6 0 0-4 7-9 4l-2-2-1 5a2 2 0 0 1-1 0zm15-3zm0 0zm-3-5zm-39-1zm1 0zm58 0zm0 0zm-157 2c3 0 4 3 6 5 1-3 0-7 3-6 3 0 4 5 7 8v-3c0-3 2-6 5-3l5 6c1 1 1-3 2-4s3-2 4-1l1 1h2s-3 3-4 1v-1c-3-1-1 6-5 6-3-1-3-5-7-7a1 1 0 0 0 0-1l-1 5c0 2-1 4-3 3l-6-8c-1 3 0 7-2 7-3-1-5-7-8-6l-1 3-1 3h-1l-2-2-1-5s0-1 0 0a20 20 0 0 0-2 5l-1 2-1 1-1-1-2-5-5 2-3-2c-1 1-3 3-5 3l-3-3s0-1 0 0v1c-1 3-1 7-8 0l-1-2h1s2 3 5 4l1-4a8 8 0 0 1 1-2l1-1 3 4 2-1 2-1h3l2 2c2-1 3-3 5-3l2 5s1-7 5-8l1 2 1 4c1-2 2-3 4-3zm26 7zm0 0zm-59-1zm0 0zm39 0zm2-5zm0 0zm-18 64c3 1 4 7 8 5l1-2c0-3-1-2 1-3h1l2 3 1 4 2-5v-2l1-1s2 1 3 5l1 1c2-2 4-3 6-1 0 1 0 2 2 1l4-3 4 4c0-2 0-4 2-6 1-1 3 2 5 3l1 2v1h-1l-5-5c-1 2 0 5-2 7h-1c-1-2-2-5-4-3l-1 1a20 20 0 0 1-1 0l-3 1c-1-1-1-3-3-2l-2 1c-1 1-2 2-3 1l-1-4v-1c-1 4-2 7-5 9l-1-1-1-5h-1c0 2-2 3-5 3l-5-5v2a21 21 0 0 1 0 1c0 2-1 4-3 3l-6-8s1 6-2 7c-2 1-4-1-6-3l-2-4c-2-1-1 6-5 6l-2-2h-1a1 1 0 0 1-1-1s3-2 4 0v1h1a4 4 0 0 0 0-1c1-2 2-6 4-5 3 1 4 5 6 7h1c2-2-1-6 2-7 2-2 5 4 8 7v-4c0-1 0-2 2-2zm20 5zm8 0zm0 0zm0 0zm-54 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm6-4zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm61 132h2v1h-2c-1 0 0 2-2 2s-2-4-4-6c-1-1-4 5-6 7-1 1-3 1-4-1v-6s-6 10-9 8l-1-6s-4 7-9 5l-1-3c-1 2 0 5-2 6l-2-1c-2-1-3-4-3-7l-2 5-6-3-2 3c-2 0-4-2-5-3s-2 1-3 3l-1 1-2-1-1-3v-1l-1-2a14 14 0 0 0-4 4h-1s-1 0 0-1c3-3 5-6 7-4l1 4s3-4 6-2l3 2c1-1 2-3 5-1l2 1h1c0-2 0-5 2-6s3 5 5 8v-3l2-4h2l1 5c1 1 4 0 5-2l1-1a13 13 0 0 1 1-1c1-1 3-1 3 1v5l5-6c1-1 3-3 4-1s-1 6 2 7l5-7h2c2 0 2 3 3 5h2l1-1zm-24 3zm0 0zm-2-5zm-39 0zm0 0zm59-1zm0 0zm-182-35h1c2 2 0 5 1 6 2 0 3-2 4-4l1-1c1-1 3 0 4 3l1 1c0-1 0-2 2-1h1v1c-1 0-2-1-2 1h-2c-2 0-2-3-3-4l-1 1c-2 2-4 7-6 4l-1-5-5 6h-1c-2 0-2-3-2-4-2 2-4 4-6 3a3 3 0 0 1-2-2l-1 4-1 1-4-6s0 3-2 3c-1 1-2-1-4-2l-1 1c-1 2-4-1-5-1l-2 3h-1c-2 0-2-4-3-6l-3 3c-1 1 0 0 0 0l-1 1-1-1 1-1c2-2 4-5 6-3l1 4v-1c1-1 3-2 4-1s2 2 3 1h6v-2a5 5 0 0 1 2-2h1l2 6s0-3 2-5h2l1 4h2l4-4a2 2 0 0 1 1 0c2 1 1 3 1 5l1-1c2-2 3-5 5-5zm-6 6zm0 0zm0 0zm8 0zm0 0zm0 0zm0 0zm0 0zm10-1zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm1 0zm0 0zm0 0zm-21-2zm0 0zm-31-1zm0 0zm47 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zM6 115l29 1h4l31 2 1 1H58l-49-1-3-1-12-1v-1H6zm15 68l61 1h8l66 1 1 1h-25l-104-1h-7l-25-1v-1h25zm-1 14l130 2 1 1H13l-25-1-1-1h33zm0 13h16l1 1-1 1h-7l-31 1h-2l-7-1h-1l1-1h3l4-1h24zm78 20l58 1h1l-1 1h-25l-107 1h-7l-25-1-1-1H2l8-1h88zm-80 11h51l29 1v1H83a4381 4381 0 0 1-65 0H-2v-1l7-1h13zm24 45l13 1h4l9 1 1 1h-6l-21-1h-6l-1-1 1-1h6zm33 13h26l1 1h-1l-9 1H47l-10-1h-1l1-1h38zm-22 16h4l-1 1h-3l-11 2-4-1v-1h1l2-1h12zm52 12h34l1 1-1 1H43l-1-1h7l5-1h51zm-57 9h20v2H43v-2h5zm-49-79h26c4 0 7 4 7 8v28l-1 55-1 1-1-1v-55l1-28c0-3-2-5-5-5l-3-1h-7l-8-1h-8l-1-1h1zm1097 2l15 1v1h-7l-27 1h-2l-7-1h-1l1-1h7l16-1h5zm-17 9h36l11 1h27v1l-14 1h-63l-15-1v-1l6-1h12zm1 60a1304 1304 0 0 1 46 0l26 1 1 1h-91l-1-1h1l6-1h12zm5-42c3 0 4 2 5 4 4 9 4 20 5 30l-1 1-1-1c0-10-1-20-5-29l-1-1c0-1-1-4-3 0-2 3-2 6-3 10l-2 20-1 1v-1c-1-9 0-18 2-27 1-3 2-7 5-7zm51-1c3 1 5 4 5 6 4 9 4 18 3 27v2h-1v-5c-1-8-1-17-4-24a12 12 0 0 0-1-2c-1-1-3-2-4 0-2 3-2 7-3 11a139 139 0 0 0-1 20v1l-1-1c0-10-1-20 2-30v-1c1-2 2-4 5-4z'/%3e%3cpath d='M1086 276h3c2 2 3 6 3 9 0 2-2 4-4 3-5 0-8-6-6-10a4 4 0 0 1 4-2zm1 1c-2 0-4 3-3 5 1 3 5 7 6 1 0-2 0-5-3-6zm45 0c-3 1-3 6-1 9 2 2 8-5 3-8a3 3 0 0 0-2-1zm0-1a5 5 0 0 1 6 2c2 3-1 9-5 10h-3c-3-2-3-6-2-9a7 7 0 0 1 4-3zm81-162c-1 75 0 150 3 225 0 4 0 9 2 13a16 16 0 0 0 14 10c113 2 226 2 341 2l13-1c10-4 16-13 17-23l1-225v-1a22 22 0 0 0-21-21c-112-2-225-2-335-2h-19a20 20 0 0 0-16 19v4zm-2-4a21 21 0 0 1 21-20c105-2 212-1 318 0l22 1h12c12 1 22 11 22 23v113l-1 113a28 28 0 0 1-27 26c-79 1-158 0-238-1l-108-2c-9 0-17-7-17-16-4-77-4-155-3-233v-4z'/%3e%3cpath d='M1250 112c-3 78-2 156 1 234h4c104 2 208 2 311-1 2-78 2-156-1-233a10740 10740 0 0 0-314-1h-1v1zm1-2a8275 8275 0 0 1 316 1 3287 3287 0 0 1 1 235l-1 1h-5a5786 5786 0 0 1-312 1l-1-1c-3-79-3-157 0-235v-3h2z'/%3e%3cpath d='M1320 197l-1-1c-1-28-2-56 0-84v-2h1c-1 29 0 57 2 85h175v-84h1l1 84v1l-1 1-56 1h-3l-119-1zm33 13l136 2h1l-1 1h-26l-110-1h-7l-27-1v-1h34zm-16 15h43l25 1-1 1h-84l-1-1h7l4-1h7zm-10 31a350 350 0 0 1 20 1h12v1l-6 1h-27l-6-1-1-1h3l4-1h1zm6 22l2 1h3v1h-2l-9 1-3-1h-1l1-1h1l6-1h2zm-5 22h8l4 1h1l-1 1h-12-3l-1-1 1-1h1a8 8 0 0 1 2 0zm3 20h17l10 1v1h-29l-5-1v-1h7zm1 20h15l5 1 11 1h1l-1 1h-6l-25-1h-2l-6-1 1-1h7zm384-98l29 1 1 1h-14l-52 1h-4l-12-1h-1l1-1h12l31-1h9zm-48-37h1l58-12h1l1 1 2 11 2 16-1 1-59 10h-1v-2a2264 2264 0 0 1-4-24v-1zm49-8l-48 9 2 10 2 12 1 1h1l54-9h2l-1-7-2-8-1-9v-1l-10 2z'/%3e%3cpath d='M1715 204l-1 1-8 1-3 1-11 2h-6l-1-1h1l2-1h2l12-2 4-1 8-1 1 1zm4 7v1l-11 2-4 1-14 3h-2l-6 1-1-1h1l2-1 4-1 15-3 5-1 11-2 1 1zm-37 41h23l7 1h17v1h-59l-1-1 1-1h12zm-13 65l1-1h69l1 1h1v9l-1 1h-70l-1-1v-9zm1 8h68v-7h-13l-55-1 1 8zM313 237l11 1h4l8 1 1 1h-25l-4-1-1-1h2l4-1z'/%3e%3c/g%3e%3c/svg%3e"

const Logo = styled.img`
  max-width: 12em;
  @media(min-width: 600px) { 
    height: 4em;
    width: 10em;
  }
`
const Section = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`
const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ColHero = styled.div`
  flex: 6 1 24rem;

  @media (min-width: 381px) {
    margin-right: 3rem;
  }
`
const ColTeaser = styled.div`
  flex: 1 1 18rem;
  padding: 2rem 1rem;

`

const Teaser = styled.h2`
  color: #aaa;
  margin: 0 0 2rem;
  max-width: 24rem;

  @media (max-width: 380px) {
    font-size: 1.4rem;
  }
`
const Fat = styled.span`
  color: black;
`
const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  @media (max-width: 380px) {
    display: none;
  }
`
const Arrow = styled.a`
  margin-bottom: 1.9rem;
  padding: 0.5em 0.7em;
  border-radius: 50%;
  font-weight: 800;
  color: white;
  background-color: ${props => props.theme.color.primary};
  transition: transform 30ms ease-out;
  transform: translate3d(0, 0, 0);
  overflow: hidden;

  &:hover {
    transform: translate3d(0, -1px, 0);
  }

  &:active {
    transform: translateY(1px);
  }
`
const Slide = keyframes`
  from {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
  53% {
    opacity: 0;
  }

  60% {
    opacity: 0;
    transform: translate3d(0,2rem,0);
  }

  to {
    opacity: 0;
    transform: translate3d(0,2rem,0);
    
  }
`
const AnimatedArrow = styled.svg`
  width: 1em;
  height: 1em;
  animation: ${Slide} 2s cubic-bezier(0.87, -0.24, 0.77, 0.34) infinite;
`

const Jobs = styled.div`
  font-weight: 500;
  padding-top: 1em;
  padding-bottom: 1em;
  color: ${p => p.theme.color.darkGray};
  background-color: ${p => p.theme.color.lightBg};

  h3 {
    margin: 0;
    color: ${p => p.theme.color.text};
  }
`

export default () => {
  const heroImage = useStaticQuery(graphql`
    query {
      imageSharp(fluid: { originalName: { regex: "/solution-collage.png/" } }) {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  `).imageSharp.fluid

  return (
    <Section id="start">
      <Container css={`
        @media (min-width: 600px) {
          padding-left: 3em;
          padding-right: 3em;
        }
      `}
      >
        <Columns css="justify-content: space-between; align-items: center; margin: 3em 0;">
          <h1 css={`flex: 1 0 10em; font-size: 1em; margin: 2em 0; @media(max-width: 599px) {text-align: center; }`}>
            <Logo
              src={logoSlogan}
              alt="Apptiva - Passgenaue Softwarelösungen"
            />
          </h1>
          <div
            css={`
              flex: 1 1 auto;
              font-size: 0.7em;
              background: ${p => p.theme.color.lightBg};
              color: #666;

              @media (min-width: 600px) {
                max-width: 280px;
              }
            `}
          >
            <img
              css="display:block; margin: 1em auto 0 0; height: 2.4em;"
              src={coronavirus}
              alt=""
            />
            <p css="margin-bottom: 0; margin-top: 0; padding: 0.8em 1em; font-weight: 600;">
              Trotz Coronavirus bearbeiten wir alle Projekte in Vollbesetzung.
            </p>
            <div css="font-size: 0.9em; margin: 0 1em 1em; text-align: right;">
              <Button to="/coronavirus">Coronavirus bei Apptiva</Button>
            </div>
          </div>
        </Columns>
      </Container>

      <Columns css="margin-right: 10%;">
        <ColHero>
          <Img
            fluid={{ ...heroImage, base64: svgData }}
            alt="Erfolgreich umgesetzte Desktop, Mobile und Weblösungen"
          />
        </ColHero>
        <ColTeaser>
          <Teaser>
            Hier kann schon bald Ihre{' '}
            <Fat>iOS, Android, Desktop oder Web-Applikation</Fat> stehen.
          </Teaser>
          <Button href="/#dienstleistungen">Unser Angebot</Button>
        </ColTeaser>
      </Columns>

      <ArrowContainer>
        <Arrow href="/#dienstleistungen">
          <AnimatedArrow viewBox="0 0 16 10">
            <path
              d="M 2 2 L 8 8 L 14 2"
              fill="transparent"
              stroke="white"
              strokeWidth="2"
            />
          </AnimatedArrow>
        </Arrow>
      </ArrowContainer>
      <Jobs>
        <Container>
          <h3>
            Wir suchen: <a href="/jobs">Fullstack-EntwicklerIn</a>
          </h3>
          Gleich bewerben und einen der besten Jobs in der
          Software&shy;entwicklung schnappen.
        </Container>
      </Jobs>
    </Section>
  )
}
