import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";
export default function homeView() {
  const user = getSession();
  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

        ${Sidebar()}

        <main class="flex-1 p bg-slate-100 min-h-screen">

        <div class="">

          <h1 class="text-sm font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900">
            Rol: ${user?.role}
          </p>

        </div>
                ${
                  user?.role === "admin"
                    ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

                <button
                  class="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Gestionar Reservas
                </button>

              </section>
            `
                    : `
              <section
                class="bg-white p-5"
              >
                <h2 class="font-bold text-xl mb-2">
                    Panel Usuario
                </h2>`
                }

    <section class="bg-white p-4 rounded shadow mb-4">
        <h3 class="font-bold mb-2">
            Nueva reserva
        </h3>
            <form id="reservationForm" class="flex gap-2 flex-wrap">

            <input name="workspace" placeholder="Espacio" class="border p-2">

            <input type="date" name="date" class="border p-2">

            <input type="time" name="startHour" class="border p-2">

            <input type="time" name="endHour" class="border p-2">

            <input name="reason" placeholder="Motivo" class="border p-2">

            <button class="bg-blue-600 text-white px-3">
                Guardar
            </button>
        </form>
    </section>
    <div 
        id="reservationsContainer" 
        class="grid gap-4 md:grid-cols-2">
    </div>
        </main>
    </div>`;
}
