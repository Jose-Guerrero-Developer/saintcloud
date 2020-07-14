<template>
  <div
    id = "languages"
  >
    <MenuBreadcrumb
      :items = "breadcrumb" />
    <div
      class = "
        columns
      "
    >
      <div
        class = "
          column
        "
      >
        <table
          class = "
            table
            is-narrow
            is-bordered
          "
        >
          <tfoot>
            <tr>
              <th>{{ $t('flag') }}</th>
              <th>{{ $t('established_language') }}</th>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <td>
                <figure
                  class = "
                    image
                    is-24x24
                  "
                >
                  <img
                    :src = "require(`@/assets/images/flags/${ selected.flag }`)" />
                </figure>
              </td>
              <td>{{ $t(selected.i18n) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class = "
        columns
        is-mobile
        is-multiline
      "
    >
      <div
        class = "
          column
        "
      >
        <table-languages
          :items = "languages" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuBreadcrumb from '@/layouts/menus/breadcrumb'
import tableLanguages from '@/components/language/table-languages'
export default { name: 'languages',
  data: () => ({
    breadcrumb: [
      {
        i18n: 'languages',
        icon: 'translate',
        route: 'languages'
      },
      {
        i18n: 'administer',
        active: true
      }
    ]
  }),
  components: {
    tableLanguages, MenuBreadcrumb
  },
  computed: {
    ...mapGetters({ languages: 'i18n/languages', selected: 'i18n/selected' })
  }
}
</script>
