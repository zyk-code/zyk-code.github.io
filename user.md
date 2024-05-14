---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/74484249?v=4',
    name: 'Z y k',
    title: '',
    links: [
      { icon: 'github', link: 'https://github.com/zyk-code' },
      { icon: 'gitee', link: 'https://github.com/zyk-code' },
      { icon: 'twitter', link: '/user' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamMembers
    :members="members"
  />
  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #lead>Lorem ipsum...</template>
    <template #members>
      <VPTeamMembers :members="data" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>