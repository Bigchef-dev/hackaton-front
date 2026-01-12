<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SportSelection from './SportSelection.vue';
import LeagueAthletesList from './LeagueAthleteList.vue';
import type { League, Athlete, Sport } from '../../utils/types';
import { SportComposable } from '../../utils/composables/sport';


const sportController = new SportComposable();
const sportList = ref<Sport[]>([]);


onMounted(() => {
  document.title = 'Liste des Ligues – SportTrack';
  sportController.getAllSports().then((sports) => {
    sportList.value = sports;
  });
});

// Données de démonstration étendues
const sports = ref<Sport[]>([
  { id: 1, name: "Football" },
  { id: 2, name: "Basketball" },
  { id: 3, name: "Tennis" },
  { id: 4, name: "Natation" },
  { id: 5, name: "Rugby" },
  { id: 6, name: "Handball" }
]);

const leagues = ref<League[]>([
  { id: 1, nom: "Ligue Régionale Bretagne", niveau: "Régional", id_sport: 1 },
  { id: 2, nom: "Ligue Nationale", niveau: "National", id_sport: 1 },
  { id: 3, nom: "Division Élite", niveau: "Professionnel", id_sport: 1 },
  { id: 4, nom: "Ligue Pro A", niveau: "Professionnel", id_sport: 2 },
  { id: 5, nom: "Ligue Pro B", niveau: "Professionnel", id_sport: 2 },
  { id: 6, nom: "Ligue Jeunes", niveau: "Junior", id_sport: 2 },
  { id: 7, nom: "Circuit Régional", niveau: "Régional", id_sport: 3 },
  { id: 8, nom: "Circuit National", niveau: "National", id_sport: 3 },
  { id: 9, nom: "Élite Nationale", niveau: "National", id_sport: 4 },
  { id: 10, nom: "Championnat Régional", niveau: "Régional", id_sport: 4 },
  { id: 11, nom: "Top 14", niveau: "Professionnel", id_sport: 5 },
  { id: 12, nom: "Pro D2", niveau: "Professionnel", id_sport: 5 },
  { id: 13, nom: "Ligue Fédérale", niveau: "Régional", id_sport: 5 },
  { id: 14, nom: "Division 1", niveau: "Professionnel", id_sport: 6 },
  { id: 15, nom: "Division 2", niveau: "National", id_sport: 6 }
]);

const athletes = ref<Athlete[]>([
  // Football - Ligue Régionale Bretagne
  { id: 1, name: "Marie", lastName: "Dubois", birthDate: "1995-03-15", phoneNumber: "06 12 34 56 78", email: "marie.dubois@email.fr", gender: "F", type: "ATHLETE", id_league: 1 },
  { id: 2, name: "Thomas", lastName: "Martin", birthDate: "1998-07-22", phoneNumber: "06 23 45 67 89", email: "thomas.martin@email.fr", gender: "M", type: "ATHLETE", id_league: 1 },
  { id: 3, name: "Julie", lastName: "Leroux", birthDate: "1997-11-10", phoneNumber: "06 34 56 78 90", email: "julie.leroux@email.fr", gender: "F", type: "ATHLETE", id_league: 1 },
  { id: 4, name: "Alexandre", lastName: "Rousseau", birthDate: "1996-05-18", phoneNumber: "06 45 67 89 01", email: "alex.rousseau@email.fr", gender: "M", type: "ATHLETE", id_league: 1 },
  { id: 5, name: "Camille", lastName: "Bonnet", birthDate: "1999-02-28", phoneNumber: "06 56 78 90 12", email: "camille.bonnet@email.fr", gender: "F", type: "ATHLETE", id_league: 1 },
  
  // Football - Ligue Nationale
  { id: 6, name: "Sophie", lastName: "Bernard", birthDate: "1996-11-08", phoneNumber: "06 34 56 78 90", email: "sophie.bernard@email.fr", gender: "F", type: "ATHLETE", id_league: 2 },
  { id: 7, name: "Lucas", lastName: "Petit", birthDate: "1997-05-30", phoneNumber: "06 45 67 89 01", email: "lucas.petit@email.fr", gender: "M", type: "ATHLETE", id_league: 2 },
  { id: 8, name: "Manon", lastName: "Girard", birthDate: "1994-09-12", phoneNumber: "06 67 89 01 23", email: "manon.girard@email.fr", gender: "F", type: "ATHLETE", id_league: 2 },
  { id: 9, name: "Nicolas", lastName: "Dupont", birthDate: "1995-12-05", phoneNumber: "06 78 90 12 34", email: "nicolas.dupont@email.fr", gender: "M", type: "ATHLETE", id_league: 2 },
  { id: 10, name: "Laura", lastName: "Fournier", birthDate: "1998-04-22", phoneNumber: "06 89 01 23 45", email: "laura.fournier@email.fr", gender: "F", type: "ATHLETE", id_league: 2 },
  { id: 11, name: "Julien", lastName: "Mercier", birthDate: "1993-08-17", phoneNumber: "06 90 12 34 56", email: "julien.mercier@email.fr", gender: "M", type: "ATHLETE", id_league: 2 },

  // Football - Division Élite
  { id: 12, name: "Océane", lastName: "Blanc", birthDate: "1992-01-30", phoneNumber: "06 01 23 45 67", email: "oceane.blanc@email.fr", gender: "F", type: "ATHLETE", id_league: 3 },
  { id: 13, name: "Pierre", lastName: "Gauthier", birthDate: "1991-06-14", phoneNumber: "06 12 34 56 78", email: "pierre.gauthier@email.fr", gender: "M", type: "ATHLETE", id_league: 3 },
  { id: 14, name: "Élise", lastName: "Marchand", birthDate: "1993-10-25", phoneNumber: "06 23 45 67 89", email: "elise.marchand@email.fr", gender: "F", type: "ATHLETE", id_league: 3 },
  { id: 15, name: "Maxime", lastName: "Renard", birthDate: "1990-03-08", phoneNumber: "06 34 56 78 90", email: "maxime.renard@email.fr", gender: "M", type: "ATHLETE", id_league: 3 },

  // Basketball - Ligue Pro A
  { id: 16, name: "Emma", lastName: "Moreau", birthDate: "1999-01-14", phoneNumber: "06 56 78 90 12", email: "emma.moreau@email.fr", gender: "F", type: "ATHLETE", id_league: 4 },
  { id: 17, name: "Hugo", lastName: "Laurent", birthDate: "2000-09-25", phoneNumber: "06 67 89 01 23", email: "hugo.laurent@email.fr", gender: "M", type: "ATHLETE", id_league: 4 },
  { id: 18, name: "Clara", lastName: "Perrin", birthDate: "1998-07-19", phoneNumber: "06 78 90 12 34", email: "clara.perrin@email.fr", gender: "F", type: "ATHLETE", id_league: 4 },
  { id: 19, name: "Nathan", lastName: "Roche", birthDate: "1997-11-03", phoneNumber: "06 89 01 23 45", email: "nathan.roche@email.fr", gender: "M", type: "ATHLETE", id_league: 4 },
  { id: 20, name: "Sarah", lastName: "Morel", birthDate: "1996-05-27", phoneNumber: "06 90 12 34 56", email: "sarah.morel@email.fr", gender: "F", type: "ATHLETE", id_league: 4 },
  { id: 21, name: "Théo", lastName: "Fabre", birthDate: "1999-12-11", phoneNumber: "06 01 23 45 67", email: "theo.fabre@email.fr", gender: "M", type: "ATHLETE", id_league: 4 },

  // Basketball - Ligue Pro B
  { id: 22, name: "Léna", lastName: "Bertrand", birthDate: "2000-03-22", phoneNumber: "06 12 34 56 78", email: "lena.bertrand@email.fr", gender: "F", type: "ATHLETE", id_league: 5 },
  { id: 23, name: "Antoine", lastName: "Lefebvre", birthDate: "1999-08-15", phoneNumber: "06 23 45 67 89", email: "antoine.lefebvre@email.fr", gender: "M", type: "ATHLETE", id_league: 5 },
  { id: 24, name: "Margaux", lastName: "Lambert", birthDate: "1998-01-09", phoneNumber: "06 34 56 78 90", email: "margaux.lambert@email.fr", gender: "F", type: "ATHLETE", id_league: 5 },
  { id: 25, name: "Baptiste", lastName: "Fontaine", birthDate: "2001-06-30", phoneNumber: "06 45 67 89 01", email: "baptiste.fontaine@email.fr", gender: "M", type: "ATHLETE", id_league: 5 },

  // Basketball - Ligue Jeunes
  { id: 26, name: "Léa", lastName: "Simon", birthDate: "2001-04-18", phoneNumber: "06 78 90 12 34", email: "lea.simon@email.fr", gender: "F", type: "ATHLETE", id_league: 6 },
  { id: 27, name: "Tom", lastName: "Richard", birthDate: "2002-11-07", phoneNumber: "06 89 01 23 45", email: "tom.richard@email.fr", gender: "M", type: "ATHLETE", id_league: 6 },
  { id: 28, name: "Jade", lastName: "Legrand", birthDate: "2003-02-14", phoneNumber: "06 90 12 34 56", email: "jade.legrand@email.fr", gender: "F", type: "ATHLETE", id_league: 6 },
  { id: 29, name: "Louis", lastName: "Garnier", birthDate: "2002-07-25", phoneNumber: "06 01 23 45 67", email: "louis.garnier@email.fr", gender: "M", type: "ATHLETE", id_league: 6 },
  { id: 30, name: "Inès", lastName: "Roussel", birthDate: "2003-09-03", phoneNumber: "06 12 34 56 78", email: "ines.roussel@email.fr", gender: "F", type: "ATHLETE", id_league: 6 },

  // Tennis - Circuit Régional
  { id: 31, name: "Antoine", lastName: "Michel", birthDate: "1994-12-03", phoneNumber: "06 89 01 23 45", email: "antoine.michel@email.fr", gender: "M", type: "ATHLETE", id_league: 7 },
  { id: 32, name: "Mathilde", lastName: "David", birthDate: "1995-06-20", phoneNumber: "06 90 12 34 56", email: "mathilde.david@email.fr", gender: "F", type: "ATHLETE", id_league: 7 },
  { id: 33, name: "Raphaël", lastName: "Colin", birthDate: "1996-10-11", phoneNumber: "06 01 23 45 67", email: "raphael.colin@email.fr", gender: "M", type: "ATHLETE", id_league: 7 },
  { id: 34, name: "Pauline", lastName: "Lecomte", birthDate: "1997-03-28", phoneNumber: "06 12 34 56 78", email: "pauline.lecomte@email.fr", gender: "F", type: "ATHLETE", id_league: 7 },

  // Tennis - Circuit National
  { id: 35, name: "Vincent", lastName: "Garnier", birthDate: "1993-05-16", phoneNumber: "06 23 45 67 89", email: "vincent.garnier@email.fr", gender: "M", type: "ATHLETE", id_league: 8 },
  { id: 36, name: "Amélie", lastName: "Sanchez", birthDate: "1992-09-09", phoneNumber: "06 34 56 78 90", email: "amelie.sanchez@email.fr", gender: "F", type: "ATHLETE", id_league: 8 },

  // Natation - Élite Nationale
  { id: 37, name: "Chloé", lastName: "Leroy", birthDate: "1993-08-27", phoneNumber: "06 90 12 34 56", email: "chloe.leroy@email.fr", gender: "F", type: "ATHLETE", id_league: 9 },
  { id: 38, name: "Arthur", lastName: "Boyer", birthDate: "1994-02-15", phoneNumber: "06 01 23 45 67", email: "arthur.boyer@email.fr", gender: "M", type: "ATHLETE", id_league: 9 },
  { id: 39, name: "Lucie", lastName: "Carpentier", birthDate: "1995-11-22", phoneNumber: "06 12 34 56 78", email: "lucie.carpentier@email.fr", gender: "F", type: "ATHLETE", id_league: 9 },
  { id: 40, name: "Gabriel", lastName: "Masson", birthDate: "1996-04-07", phoneNumber: "06 23 45 67 89", email: "gabriel.masson@email.fr", gender: "M", type: "ATHLETE", id_league: 9 }
]);

const selectedSportId = ref<number | null>(null);

const selectedSport = computed(() => 
  sports.value.find(s => s.id === selectedSportId.value)
);

const handleSelectSport = (sportId: number) => {
  selectedSportId.value = sportId;
};

const handleBack = () => {
  selectedSportId.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100 p-6">
    <div class="max-w-7xl mx-auto mb-8">
      <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Liste des Ligues
      </h1>
      <p class="text-gray-400">Visualisez la répartition des athlètes dans les ligues</p>
    </div>

    <SportSelection
      v-if="!selectedSportId"
      :sports="sports"
      :leagues="leagues"
      :athletes="athletes"
      @select-sport="handleSelectSport"
    />

    <LeagueAthletesList
      v-else-if="selectedSport"
      :sport="selectedSport"
      :leagues="leagues"
      :athletes="athletes"
      @back="handleBack"
    />
  </div>
</template>