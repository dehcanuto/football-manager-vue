<script setup lang="ts">
const props = defineProps<{
  small?: boolean;
  home: {
    name: string;
    color: string;
    logo?: string;
    link?: string;
    score?: number;
  };
  away: {
    name: string;
    color: string;
    logo?: string;
    link?: string;
    score?: number;
  };
}>();
</script>

<template>
  <div class="match-card" :class="{ small: small }">
    <div class="team team--home">
      <div class="team__name">
        <RouterLink :to="home.link || '#'">{{ home.name }}</RouterLink>
      </div>
      <div class="team__badge" :style="{ backgroundColor: home.color }">
        <span>{{ home.name[0] }}</span>
      </div>
    </div>

    <div class="score">
      <span v-show="home.score != null">{{ home.score }}</span>
      <span class="score__separator">X</span>
      <span v-show="away.score != null">{{ away.score }}</span>
    </div>

    <div class="team team--away">
      <div class="team__badge" :style="{ backgroundColor: away.color }">
        <span>{{ away.name[0] }}</span>
      </div>
      <div class="team__name">
        <RouterLink :to="away.link || '#'">{{ away.name }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.match-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.25rem 0;
  width: 100%;

  .team {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 40%;

    &--home {
      justify-content: flex-end;
      text-align: right;
    }

    &--away {
      justify-content: flex-start;
      text-align: left;
    }

    &__name {
      font-size: 1.5rem;
      font-weight: 600;

      a {
        transition: color 0.2s;
        &:hover {
          color: theme("colors.primary");
        }
      }
    }

    &__badge {
      width: 4rem;
      height: 4rem;
      border-radius: 9999px;
      border: 4px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;

      span {
        color: white;
        font-size: 1.75rem;
        font-weight: bold;
      }
    }
  }

  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    span {
      font-weight: 700;
      font-size: 2.5rem;
    }

    &__separator {
      color: theme("colors.primary");
      font-size: 1.25rem;
    }
  }

  /* --- Variante Small --- */
  &.small {
    gap: 0.75rem;
    padding: 0.5rem 0;

    .team {
      gap: 0.75rem;

      &__name {
        font-size: 0.85rem;
        font-weight: normal;
        color: #fff;
      }

      &__badge {
        width: 2rem;
        height: 2rem;
        border-width: 2px;

        span {
          font-size: 1rem;
        }
      }
    }

    .score {
      gap: 0.75rem;

      span {
        font-size: 1rem;
      }

      &__separator {
        font-size: 0.5rem;
      }
    }
  }
}
</style>
