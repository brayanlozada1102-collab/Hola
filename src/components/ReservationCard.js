export default function ReservationCard(reservation, role) {
    const { workspace, date, startHour, endHour, reason, status, id } = reservation;
    return `
    <article
      class="bg-white p-3 rounded shadow"
    >
      <h3 class="font-bold text-lg">
        ${workspace}
      </h3>

      <div class="">

        <p>
          Fecha:
          ${date}
        </p>

        <p>
          Horario:
          ${startHour}
          -
          ${endHour}
        </p>

        <p>
          Motivo:
          ${reason}
        </p>

        <p>
          Estado:
          <span class="">
            ${status}
          </span>
        </p>
        ${role === "admin" && status === "pending" ? `<button data-id="${id}" class="approveBtn bg-green-600 text-white px-2 py-1 mt-2">Aprobar</button>`: ""}
        ${role === "admin" ? `<button data-id="${id}" class="deleteBtn bg-red-600 text-white px-2 py-1 mt-2">Delete</button>` : ""}


      </div>
    </article>
  `;
}
