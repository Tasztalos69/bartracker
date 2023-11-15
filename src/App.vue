<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { RouterView } from "vue-router";
import { Menu2Icon, Focus2Icon } from "vue-tabler-icons";
import mapStyle from "./map-style.json";
import markerIcon from "@/assets/marker.svg";
import { BOUNDS, CENTER, DEFAULT_ZOOM } from "@/constants";
import store from "./store";
import {
  useCollection,
  useCurrentUser,
  useFirebaseAuth,
  useFirestore,
} from "vuefire";
import { collection, orderBy, query, where } from "firebase/firestore";
import geoPointToLatLng from "./geoPointToLatLng";
import type { CompoundPlace, Visit } from "./types";
import loader from "./useLoader";

const db = useFirestore();
const user = useCurrentUser();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const auth = useFirebaseAuth();

auth?.onAuthStateChanged((u) => {
  if (!u) {
    isMenuOpen.value = true;
  }
});

const visitsRef = collection(db, "visits");

const visitSource = computed(() =>
  user.value
    ? query(
        visitsRef,
        where("userId", "==", user.value.uid),
        orderBy("date", "desc")
      )
    : null
);

const visits = useCollection<Visit>(visitSource);

const mapOptions: google.maps.MapOptions = {
  styles: mapStyle,
  zoom: DEFAULT_ZOOM,
  center: CENTER,
  disableDefaultUI: true,
  clickableIcons: false,
  restriction: {
    latLngBounds: BOUNDS,
  },
};

const glib = ref<google.maps.MapsLibrary | null>(null);

onMounted(() =>
  loader.importLibrary("maps").then((g) => {
    glib.value = g;

    store.map = new g.Map(
      document.getElementById("map") as HTMLElement,
      mapOptions
    );
  })
);

const parseVisits = async () => {
  store.places = [];

  if (!user.value) {
    redraw();
    return;
  }

  visits.value.forEach((d: Visit) => {
    const find = store.places.find((p) => p.place_id === d.place.place_id);

    if (find) {
      find.visits.push(d);
    } else {
      const obj = { ...d.place, visits: [d] } as CompoundPlace;
      store.places.push(obj);
    }
  });

  redraw();
};

const redraw = () => {
  store.markers.forEach((m) => {
    m.setMap(null);
    m.setOpacity(0);
  });
  store.markers = [];
  store.infoWindows = [];

  store.places.forEach((place) => {
    if (!glib.value) return;

    // Create InfoWindow
    const infoWindow = new glib.value.InfoWindow({
      content: `
        <div class="info-window">
          <h3>${place.name}</h3>
          <h4>${place.formatted_address}</h4>
        </div>`,
      ariaLabel: "ariaLabel",
    });
    store.infoWindows.push(infoWindow);

    // Create Marker
    const marker = new google.maps.Marker({
      position: place.coords ? geoPointToLatLng(place.coords) : null,
      icon: {
        url: markerIcon,
        scaledSize: new google.maps.Size(20, 20),
      },
      map: store.map,
      optimized: false,
    });

    marker.addListener("click", () => {
      store.infoWindows.forEach((iw) => iw.close());
      infoWindow.open({
        anchor: marker,
        map: store.map,
      });
    });

    store.markers.push(marker);
  });
};

onMounted(parseVisits);
watch(user, parseVisits);
watch(visits, parseVisits, { deep: true });
watch(glib, redraw);

const recenter = () => {
  if (!store.map) return;
  store.map.panTo(CENTER);
  store.map.setZoom(DEFAULT_ZOOM);
};
</script>

<template>
  <button class="menu-toggle" :class="{ open: isMenuOpen }">
    <Menu2Icon size="32" @click="toggleMenu" />
  </button>

  <!-- UI -->
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <div class="ui" v-if="isMenuOpen">
        <h1 class="title">Bartracker</h1>
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>

  <button class="center-button" @click="recenter">
    <Focus2Icon size="28" />
  </button>

  <div id="map" />
</template>

<style scoped lang="scss">
@import "@/styles/variables";

#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 1;
}

.ui,
nav,
.center-button {
  position: relative;
  z-index: 2;
}

.menu-toggle {
  position: absolute;
  top: 23px;
  left: 25px;
  z-index: 3;

  svg {
    transition: $transition-medium;
    color: $bg;
  }

  &.open svg {
    color: $text;
  }
}

.ui {
  position: absolute;
  top: 10px;
  left: 10px;
  width: calc(20vw - 30px);
  height: calc(100vh - 20px);
  min-width: 300px;
  padding: 0 15px;
  background: $bg;
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: 700px) {
    z-index: 2;
    top: 0;
    left: 0;
    width: calc(100% - 30px);
    height: 100%;
    border-radius: 0;
  }

  .title {
    margin-top: 7px;
    margin-bottom: 20px;
    font-family: "Lobster", serif;
    text-align: center;
  }
}

.center-button {
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  width: 38px;
  height: 38px;
  border-radius: 3px;
  background: $bg;

  @media screen and (max-width: 700px) {
    z-index: 1;
  }

  * {
    color: $text;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: $transition-medium;
}

.fade-enter-from,
.fade-leave-to {
  left: -320px;
}
</style>

<style lang="scss">
@import "@/styles/variables";
.info-window {
  font-size: 0.8rem;

  h3 {
    font-weight: 700;
  }

  h4 {
    margin-top: 5px;
  }
}
</style>
./useLoader
