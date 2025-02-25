import { Container } from "../../../components/ui/Container";

export function AboutSection() {
    return (
        <section className="py-16 md:py-24 bg-stone-100">
            <Container>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-stone-800 mb-6">O nama</h2>
                        {/* Weitere Inhalte hier */}
                    </div>
                </div>
            </Container>
        </section>
    );
}