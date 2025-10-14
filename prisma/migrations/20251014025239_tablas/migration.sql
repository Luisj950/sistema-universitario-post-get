-- CreateTable
CREATE TABLE "Estudiantes" (
    "id_estudiante" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Estudiantes_pkey" PRIMARY KEY ("id_estudiante")
);

-- CreateTable
CREATE TABLE "Carreras" (
    "id_carrera" SERIAL NOT NULL,
    "nombre_carrera" TEXT NOT NULL,

    CONSTRAINT "Carreras_pkey" PRIMARY KEY ("id_carrera")
);

-- CreateTable
CREATE TABLE "Profesores" (
    "id_profesor" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,

    CONSTRAINT "Profesores_pkey" PRIMARY KEY ("id_profesor")
);

-- CreateTable
CREATE TABLE "Titulos" (
    "id_titulo" SERIAL NOT NULL,
    "nombre_titulo" TEXT NOT NULL,
    "id_profesor" INTEGER NOT NULL,

    CONSTRAINT "Titulos_pkey" PRIMARY KEY ("id_titulo")
);

-- CreateTable
CREATE TABLE "Aulas" (
    "id_aula" SERIAL NOT NULL,
    "numero_aula" TEXT NOT NULL,
    "edificio" TEXT,

    CONSTRAINT "Aulas_pkey" PRIMARY KEY ("id_aula")
);

-- CreateTable
CREATE TABLE "Materias" (
    "id_materia" SERIAL NOT NULL,
    "nombre_materia" TEXT NOT NULL,
    "codigo_materia" TEXT NOT NULL,
    "id_carrera" INTEGER NOT NULL,

    CONSTRAINT "Materias_pkey" PRIMARY KEY ("id_materia")
);

-- CreateTable
CREATE TABLE "Cursos" (
    "id_curso" SERIAL NOT NULL,
    "semestre" TEXT,
    "anio" INTEGER,
    "id_materia" INTEGER NOT NULL,
    "id_profesor" INTEGER NOT NULL,
    "id_aula" INTEGER NOT NULL,

    CONSTRAINT "Cursos_pkey" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "Inscripciones" (
    "id_inscripcion" SERIAL NOT NULL,
    "fecha_inscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_estudiante" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,

    CONSTRAINT "Inscripciones_pkey" PRIMARY KEY ("id_inscripcion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiantes_email_key" ON "Estudiantes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Materias_codigo_materia_key" ON "Materias"("codigo_materia");

-- AddForeignKey
ALTER TABLE "Titulos" ADD CONSTRAINT "Titulos_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesores"("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materias" ADD CONSTRAINT "Materias_id_carrera_fkey" FOREIGN KEY ("id_carrera") REFERENCES "Carreras"("id_carrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos" ADD CONSTRAINT "Cursos_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "Materias"("id_materia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos" ADD CONSTRAINT "Cursos_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesores"("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos" ADD CONSTRAINT "Cursos_id_aula_fkey" FOREIGN KEY ("id_aula") REFERENCES "Aulas"("id_aula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripciones" ADD CONSTRAINT "Inscripciones_id_estudiante_fkey" FOREIGN KEY ("id_estudiante") REFERENCES "Estudiantes"("id_estudiante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripciones" ADD CONSTRAINT "Inscripciones_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Cursos"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;
