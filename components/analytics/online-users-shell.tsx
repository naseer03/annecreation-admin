import { OnlineUsersHeader } from "./online-users-header"
import { OnlineUsersList } from "./online-users-list"

export function OnlineUsersShell() {
  return (
    <div className="flex flex-col gap-6">
      <OnlineUsersHeader />
      <OnlineUsersList />
    </div>
  )
}
