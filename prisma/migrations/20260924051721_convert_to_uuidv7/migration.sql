-- 1. CREAR TABLAS TEMPORALES DE MAPEO PARA CONSERVAR RELACIONES
CREATE TEMP TABLE tmp_developer_map (old_id TEXT, new_id UUID);
CREATE TEMP TABLE tmp_skill_map (old_id TEXT, new_id UUID);

-- Llenar mapas asociando el CUID viejo con un UUIDv7 nuevo y válido generado por Postgres 18
INSERT INTO tmp_developer_map (old_id, new_id)
SELECT id, uuidv7() FROM "Developer";

INSERT INTO tmp_skill_map (old_id, new_id)
SELECT id, uuidv7() FROM "Skill";

-- 2. ELIMINAR RESTRICCIONES DE LLAVES FORÁNEAS ACTUALES
ALTER TABLE "DeveloperSkill" DROP CONSTRAINT "DeveloperSkill_developerId_fkey";
ALTER TABLE "DeveloperSkill" DROP CONSTRAINT "DeveloperSkill_skillId_fkey";
ALTER TABLE "Project" DROP CONSTRAINT "Project_developerId_fkey";
ALTER TABLE "Cv" DROP CONSTRAINT "Cv_developerId_fkey";

-- 3. ACTUALIZAR ID'S EN TABLAS PRINCIPALES USANDO LOS MAPAS
ALTER TABLE "Developer" ALTER COLUMN "id" DROP DEFAULT;
UPDATE "Developer" d SET "id" = m.new_id FROM tmp_developer_map m WHERE d.id = m.old_id;
ALTER TABLE "Developer" ALTER COLUMN "id" TYPE UUID USING id::UUID;
ALTER TABLE "Developer" ALTER COLUMN "id" SET DEFAULT uuidv7();

ALTER TABLE "Skill" ALTER COLUMN "id" DROP DEFAULT;
UPDATE "Skill" s SET "id" = m.new_id FROM tmp_skill_map m WHERE s.id = m.old_id;
ALTER TABLE "Skill" ALTER COLUMN "id" TYPE UUID USING id::UUID;
ALTER TABLE "Skill" ALTER COLUMN "id" SET DEFAULT uuidv7();

-- 4. ACTUALIZAR TABLAS DEPENDIENTES (Convertir IDs a UUIDv7 nuevos)
-- Project
UPDATE "Project" p SET "developerId" = m.new_id FROM tmp_developer_map m WHERE p."developerId" = m.old_id;
ALTER TABLE "Project" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "id" TYPE UUID USING uuidv7(); -- Genera UUIDv7 para proyectos existentes
ALTER TABLE "Project" ALTER COLUMN "id" SET DEFAULT uuidv7();
ALTER TABLE "Project" ALTER COLUMN "developerId" TYPE UUID USING "developerId"::UUID;

-- Cv
UPDATE "Cv" c SET "developerId" = m.new_id FROM tmp_developer_map m WHERE c."developerId" = m.old_id;
ALTER TABLE "Cv" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "Cv" ALTER COLUMN "id" TYPE UUID USING uuidv7(); -- Genera UUIDv7 para CVs existentes
ALTER TABLE "Cv" ALTER COLUMN "id" SET DEFAULT uuidv7();
ALTER TABLE "Cv" ALTER COLUMN "developerId" TYPE UUID USING "developerId"::UUID;

-- DeveloperSkill (Tabla intermedia)
UPDATE "DeveloperSkill" ds SET "developerId" = m.new_id FROM tmp_developer_map m WHERE ds."developerId" = m.old_id;
UPDATE "DeveloperSkill" ds SET "skillId" = m.new_id FROM tmp_skill_map m WHERE ds."skillId" = m.old_id;
ALTER TABLE "DeveloperSkill" ALTER COLUMN "developerId" TYPE UUID USING "developerId"::UUID;
ALTER TABLE "DeveloperSkill" ALTER COLUMN "skillId" TYPE UUID USING "skillId"::UUID;

-- 5. RECONSTRUIR LAS LLAVES FORÁNEAS Y RESTRICCIONES EN CASCADA
ALTER TABLE "DeveloperSkill" ADD CONSTRAINT "DeveloperSkill_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DeveloperSkill" ADD CONSTRAINT "DeveloperSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Project" ADD CONSTRAINT "Project_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 6. LIMPIEZA DE TABLAS TEMPORALES
DROP TABLE tmp_developer_map;
DROP TABLE tmp_skill_map;
