<template>
  <div class="layout">
    <SfHeader>
      <template slot-name="middle">
        logo
      </template>
    </SfHeader>
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
