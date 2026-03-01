<script setup lang="ts">
import { computed } from 'vue';

interface MatchStatus {
  id: number;
  name: string;
  abbreviation: string;
  colorPrimary: string;
  colorSecondary: string;
  colorTertiary: string;
}

const props = defineProps<{
  status: string;
  homeScore?: number;
  awayScore?: number;
  homeTeam: MatchStatus;
  awayTeam: MatchStatus;
  size?: "medium" | "small";
}>();

const hasScore = computed(() => props.status === "FINISHED")
</script>

<template>
  <div
    class="match-card"
    :class="{ medium: size === 'medium', small: size === 'small' }"
  >
    <div class="team team--home">
      <div class="team__name">
        <RouterLink to="#">{{ homeTeam.name }}</RouterLink>
      </div>
      <div class="team__badge" :style="{ backgroundColor: homeTeam.colorPrimary }">
        <span>{{ homeTeam.abbreviation }}</span>
      </div>
    </div>

    <div class="score">
      <span v-show="hasScore">{{ homeScore }}</span>
      <span class="score__separator">X</span>
      <span v-show="hasScore">{{ awayScore }}</span>
    </div>

    <div class="team team--away">
      <div class="team__badge" :style="{ backgroundColor: awayTeam.colorPrimary }">
        <span>{{ awayTeam.abbreviation }}</span>
      </div>
      <div class="team__name">
        <RouterLink to="#">{{ awayTeam.name }}</RouterLink>
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
      font-size: 1.4rem;
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
        font-size: 1.25rem;
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

  /* --- Variante Medium --- */
  &.medium {
    gap: 0.75rem;
    padding: 0.5rem 0;

    .team {
      gap: 0.75rem;

      &__name {
        font-size: 1.25rem;
        font-weight: normal;
        color: #fff;
      }

      &__badge {
        width: 2.5rem;
        height: 2.5rem;
        border-width: 2px;

        span {
          font-size: 1rem;
        }
      }
    }

    .score {
      gap: 0.75rem;

      span {
        font-size: 1.75rem;
      }

      &__separator {
        font-size: 0.5rem;
      }
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
          font-size: 0.70rem;
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
