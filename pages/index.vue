<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="panel panel-primary">
        <div class="list-group row">
          <div class="list-group-item col-sm-4 col-xs-12">
            <v-card color="#00a65a" dark elevation="0" dense class="px-1">
              <div class="d-flex flex-no-wrap">
                <v-icon size="70">mdi-cash</v-icon>
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;" class="mr-2">
                  <div style="display: flex; flex-direction: column">
                    <div>
                      Личный счет
                    </div>
                    <div class="font-weight-bold">
                      0.00 ₽
                    </div>
                  </div>
                  <v-btn color="success" small dark elevation="0" to="/donate">Пополнить</v-btn>
                </div>
              </div>
            </v-card>
          </div>
          <div class="list-group-item col-sm-4 col-xs-12">
            <v-card color="#0c42ae" dark elevation="0" dense class="px-1">
              <div class="d-flex flex-no-wrap">
                <v-icon size="70">mdi-cash</v-icon>
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;" class="mr-2">
                  <div style="display: flex; flex-direction: column">
                    <div>
                      Партнерский счет
                    </div>
                    <div class="font-weight-bold">
                      0.00 ₽
                    </div>
                  </div>
                  <v-btn color="primary" small dark elevation="0" to="stats">Детализация</v-btn>
                </div>
              </div>
            </v-card>
          </div>
          <div class="list-group-item col-sm-4 col-xs-12">
            <v-card color="#ffa636" dark elevation="0" dense class="px-1">
              <div class="d-flex flex-no-wrap">
                <v-icon size="70">mdi-cash</v-icon>
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;" class="mr-2">
                  <div style="display: flex; flex-direction: column">
                    <div>
                     Реферальная система
                    </div>
                    <div class="font-weight-bold">
                      0
                    </div>
                  </div>
                  <v-btn color="warning" small dark elevation="0">FAQ</v-btn>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
	export default {
		data: () => ({})
	};
</script>
