/* eslint-disable */
import { ref, watch, computed } from '@vue/composition-api';
import { store } from '@/store';
import { getZonedDateTime } from '@/utils/date-helpers';
import { title } from '@/core/utils/filter';
import { i18n } from '@/i18n';

// Notification
import ToastificationContent from '@/core/components/toastification/ToastificationContent.vue'

export default function useUsersList() {
  // Use toast

  const refUserListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'user', label: 'Code', sortable: true },
    { key: 'valid_from', formatter: (val) => getZonedDateTime(val), label: 'Valid de la', sortable: true },
    { key: 'valid_until', formatter: (val) => getZonedDateTime(val), label: 'Valid pana la', sortable: true },
    { key: 'first_timers_only', label: 'Prima rezervare', formatter: (val) => val ? 'Da' : 'Nu', sortable: true },
    { key: 'uses_left', label: 'Utilizari ramase', sortable: true },
    { key: 'minimum_order_value', label: 'Comanda minima', formatter: (val) => `${val} Lei`, sortable: true },
    { key: 'percentage_discount', label: 'Discount %', formatter: (val) => val ? `${val}%` : '-', sortable: true },
    { key: 'direct_discount', label: 'Discount fix', formatter: (val) => val ? `${val} Lei` : '-', sortable: true },
    { key: 'visible', label: 'Vizibil in aplicatie', formatter: (val) => val ? 'Da' : 'Nu', sortable: true },
  ]

  const perPage = ref(10)
  const totalUsers = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const cityFilter = ref(null)
  const serviceFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalUsers.value,
    }
  })

  const refetchData = () => {
    refUserListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, cityFilter, serviceFilter, statusFilter], () => {
    refetchData()
  })

  const fetchUsers = (ctx, callback) => {
    store
      .dispatch('app-user/fetchUsers', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        city: cityFilter.value,
        plan: planFilter.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { users, total } = response.data

        callback(users)
        totalUsers.value = total
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserRoleVariant = role => {
    if (role === 'subscriber') return 'primary'
    if (role === 'author') return 'warning'
    if (role === 'maintainer') return 'success'
    if (role === 'editor') return 'info'
    if (role === 'admin') return 'danger'
    return 'primary'
  }

  const resolveUserRoleIcon = role => {
    if (role === 'subscriber') return 'UserIcon'
    if (role === 'author') return 'SettingsIcon'
    if (role === 'maintainer') return 'DatabaseIcon'
    if (role === 'editor') return 'Edit2Icon'
    if (role === 'admin') return 'ServerIcon'
    return 'UserIcon'
  }

  const resolveUserStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'accepted') return 'success'
    if (status === 'paused') return 'secondary'
    if (status === 'blocked') return 'danger'
    return 'primary'
  }

  return {
    fetchUsers,
    tableColumns,
    perPage,
    currentPage,
    totalUsers,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refUserListTable,

    resolveUserRoleVariant,
    resolveUserRoleIcon,
    resolveUserStatusVariant,
    refetchData,

    // Extra Filters
    cityFilter,
    serviceFilter,
    statusFilter,
  }
}
