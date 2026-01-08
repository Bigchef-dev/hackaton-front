# Composables Documentation

## AthleteComposable

### **getAllAthletes** - `athletes`
- **Parameters**: None
- **Returns**: `Promise<Athlete[]>`

### **getAthleteById** - `athletes/{athleteId}`
- **Parameters**: `athleteId: string`
- **Returns**: `Promise<Athlete>`

### **getAthleteLeague** - `athletes/{athleteId}/league`
- **Parameters**: `athleteId: string`
- **Returns**: `Promise<League>`

### **updateAthlete** - `athletes/{athleteId}`
- **Parameters**: `athleteId: number`, `data: Athlete`
- **Returns**: `Promise<Athlete>`

### **createAthlete** - `athletes`
- **Parameters**: `data: Athlete`
- **Returns**: `Promise<Athlete>`

### **deleteAthlete** - `athletes/{athleteId}`
- **Parameters**: `athleteId: number`
- **Returns**: `Promise<void>`

---

## CheckerComposable

### **isValidEmail**
- **Parameters**: `email: string`
- **Returns**: `boolean`

### **isValidPhoneNumber**
- **Parameters**: `phoneNumber: string`
- **Returns**: `boolean`

### **isValidDate**
- **Parameters**: `dateString: Date`
- **Returns**: `boolean`

### **isLeagueIdValid**
- **Parameters**: `leagueId: number | undefined`
- **Returns**: `boolean`

### **isUserInfoValid**
- **Parameters**: `userInfo: Partial<UserInfo>`
- **Returns**: `boolean`

### **isUserInfoComplete**
- **Parameters**: `userInfo: Partial<UserInfo>`
- **Returns**: `boolean`

---

## ClubComposable

### **getAllClubs** - `clubs`
- **Parameters**: None
- **Returns**: `Promise<Club[]>`

### **getClubById** - `clubs/{clubId}`
- **Parameters**: `clubId: string`
- **Returns**: `Promise<Club>`

### **getClubGroups** - `clubs/{clubId}/groups`
- **Parameters**: `clubId: string`
- **Returns**: `Promise<Group[]>`

### **getClubSessions** - `clubs/{clubId}/sessions`
- **Parameters**: `clubId: string`
- **Returns**: `Promise<Session[]>`

### **getClubMembers** - `clubs/{clubId}/users`
- **Parameters**: `clubId: string`
- **Returns**: `Promise<UserInfo[]>`

### **getClubAthletes** - `clubs/{clubId}/athletes`
- **Parameters**: `clubId: string`
- **Returns**: `Promise<Athlete[]>`

### **getClubCoaches** - `clubs/{clubId}/coaches`
- **Parameters**: `clubId: string`
- **Returns**: `Promise<UserInfo[]>`

### **createClub** - `clubs`
- **Parameters**: `data: Club`
- **Returns**: `Promise<Club>`

---

## LeagueComposable

### **getAllLeagues** - `leagues`
- **Parameters**: None
- **Returns**: `Promise<League[]>`

### **getLeagueById** - `leagues/{leagueId}`
- **Parameters**: `leagueId: string`
- **Returns**: `Promise<League>`

### **getLeagueMembers** - `leagues/{leagueId}/users`
- **Parameters**: `leagueId: string`
- **Returns**: `Promise<UserInfo[]>`

---

## SessionComposable

### **getSessionInfo** - `session/{id}/info`
- **Parameters**: `id: number`
- **Returns**: `Promise<Session>`

### **getSessionAthletes** - `session/{id}/athletes`
- **Parameters**: `id: number`
- **Returns**: `Promise<Athlete[]>`

### **getSessionActivities** - `session/{id}/activities`
- **Parameters**: `id: number`
- **Returns**: `Promise<Activity[]>`

### **createSession** - `session`
- **Parameters**: `data: Session`
- **Returns**: `Promise<Session>`

### **updateSession** - `session/{id}`
- **Parameters**: `id: number`, `data: Partial<Session>`
- **Returns**: `Promise<Session>`

### **deleteSession** - `session/{id}`
- **Parameters**: `id: number`
- **Returns**: `Promise<void>`

---

## UserComposable

### **getAllUsers** - `users`
- **Parameters**: None
- **Returns**: `Promise<UserInfo[]>`

### **getUserById** - `users/{userId}`
- **Parameters**: `userId: string`
- **Returns**: `Promise<UserInfo>`

### **getUserGroups** - `users/{userId}/groups`
- **Parameters**: `userId: string`
- **Returns**: `Promise<Group[]>`

### **getUserSessions** - `users/{userId}/sessions`
- **Parameters**: `userId: string`
- **Returns**: `Promise<Session[]>`

### **getUserInfo** - `users/{userId}`
- **Parameters**: `userId: string`
- **Returns**: `Promise<UserInfo>`

### **updateUserInfo** - `users/{userId}`
- **Parameters**: `userId: number`, `data: Partial<UserInfo>`
- **Returns**: `Promise<UserInfo>`