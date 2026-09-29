import TagihanBayarSelesaiController from './TagihanBayarSelesaiController'
import TagihanBayarController from './TagihanBayarController'
import MidtransNotificationController from './MidtransNotificationController'
import UserController from './UserController'
import SewaController from './SewaController'
import TagihanController from './TagihanController'
import PembayaranController from './PembayaranController'
import RoleController from './RoleController'
import KamarController from './KamarController'
import TagihanWaReminderController from './TagihanWaReminderController'
import Settings from './Settings'
const Controllers = {
    TagihanBayarSelesaiController: Object.assign(TagihanBayarSelesaiController, TagihanBayarSelesaiController),
TagihanBayarController: Object.assign(TagihanBayarController, TagihanBayarController),
MidtransNotificationController: Object.assign(MidtransNotificationController, MidtransNotificationController),
UserController: Object.assign(UserController, UserController),
SewaController: Object.assign(SewaController, SewaController),
TagihanController: Object.assign(TagihanController, TagihanController),
PembayaranController: Object.assign(PembayaranController, PembayaranController),
RoleController: Object.assign(RoleController, RoleController),
KamarController: Object.assign(KamarController, KamarController),
TagihanWaReminderController: Object.assign(TagihanWaReminderController, TagihanWaReminderController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers