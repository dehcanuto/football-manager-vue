<script setup lang="ts">
import { menuOptions } from "@constants/menu";
import MenuList from "@components/molecules/MenuList.vue";
import Icon from "../atoms/Icon.vue";
</script>
<template>
  <header class="bg-base-200 text-white">
    <nav
      class="navbar mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    >
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <MenuList
            :items="menuOptions"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          />
        </div>
        <a class="btn btn-ghost text-xl">⚽ Football Manager</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <MenuList
          :items="menuOptions"
          className="menu menu-horizontal px-1 gap-6"
        />
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <div class="indicator">
            <Icon name="notification" />
            <span class="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
