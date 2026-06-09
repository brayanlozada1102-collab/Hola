import ReservationCard from "@components/ReservationCard";
import {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation
} from "@services/reservation.service";
import { getSession } from "@/utils";

export const homeController = async () => {
    const container = document.querySelector("#reservationsContainer");

    const form = document.querySelector("#reservationForm");
    const user = getSession();
    const load = async () => {
        const reservations = await getReservations();
        const filteredReservations =
            user.role === "admin"
                ? reservations
                : reservations.filter((reservation) => reservation.userId === user.id);
        container.innerHTML =
            filteredReservations.map((reservation) => ReservationCard(reservation, user.role)).join("") ||
            '<p class="text-slate-500" >No hay reservas</p>';
        document.querySelectorAll(".approveBtn").forEach(
            (btn) =>
            (btn.onclick = async () => {
                await updateReservation(btn.dataset.id, { status: "approved" });
                load();
            }),
        )
        document.querySelectorAll(".deleteBtn").forEach(
            (btn) =>
            (btn.onclick = async () => {
                await deleteReservation(btn.dataset.id, { });
                load();
            }),
        )
        ;
    };
    await load();
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        const all = await getReservations();
        const dup = all.find(
            (reservation) =>
                reservation.workspace === data.workspace &&
                reservation.date === data.date &&
                reservation.startHour === data.startHour,
        );
        if (dup) {
            alert("Horario ocupado");
            return;
        }
        await createReservation({ ...data, userId: user.id, status: "pending" });
        form.reset();
        load();
    });
};
