---
layout: page
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/zyk-code.png',
    name: 'zou yong ke',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://www.github.com/zyk-code' },
    ]
  },
]
</script>

<VPTeamMembers size="small" :members="members" />