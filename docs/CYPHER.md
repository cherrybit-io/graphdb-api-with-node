# Cypher with the StarWars Universe

## (label:Node)

Nodes:

- Film
- Planet
- Person
- Species
- Vehicle
- Starship

## [label:RELATION]

Relationships:

- APPEARED_IN
- HAS_HOMEWORLD
- HAS_SPECIES
- HAS_STARSHIP
- HAS_VEHICLE

```cypher
CREATE (my_node:Thing)
RETURN my_node cypher
```

```cypher
CREATE (my_node:Thing:AnotherThing)
RETURN my_node
```

```cypher
CREATE (luke:Character {name: "Luke Skywalker", gender: "male"}) RETURN luke
```

```cypher
CREATE (leia:Character)
SET leia.name = "Leia Organa",
    leia.gender = "female"
RETURN leia
```

```cypher
CREATE (han:Character)-[r:HAS_SIDEKICK]->(chewie:Character)
SET han.name = "Han Solo",
    han.gender = "male",
    chewie.name = "Chewbacca",
    chewie.gender = "male"
RETURN han, chewie
```

```cypher
CREATE CONSTRAINT ON (c:Character) ASSERT c.name IS UNIQUE
```

```cypher
DROP CONSTRAINT ON (c:Character) ASSERT c.name IS UNIQUE
```

```cypher
CREATE CONSTRAINT ON ()-[r:HAS_SIDEKICK]-() ASSERT exists(r.since)
```

```cypher
DROP CONSTRAINT ON ()-[r:HAS_SIDEKICK]-() ASSERT exists(r.since)
```

```cypher
MATCH (luke:Character {name: "Luke Skywalker"}) RETURN luke
```

```cypher
MATCH (luke:Character) 
WHERE luke.name = "Luke Skywalker"
AND luke.gender = "male"
OR NOT exists(luke.gender)
RETURN luke
```

```cypher
MATCH (luke:Character)-[:HAS_SISTER]-(sister),
    (sister)-[:HAS_FRIEND]->(friend)
WHERE luke.name = "Luke Skywalker"
AND luke.gender = "male"
OR NOT exists(luke.gender)
RETURN friend
```

```cypher
MATCH (nodes) RETURN nodes
```

```cypher
MATCH (luke:Character {name: "Luke Skywalker"}) SET luke.hair_color = "blonde" RETURN luke
```

```cypher
:params { luke_params: { hair_color: "blonde", skin_color: "fair"}}
```

```cypher
MATCH (luke:Character {name: "Luke Skywalker"}) SET luke.hair_color = $luke_params.hair_color RETURN luke
```

```cypher
MATCH (luke:Character {name: "Luke Skywalker"}) SET luke += $luke_params RETURN luke
```

```cypher
:params { luke_params: { name: "Luke Skywalker", hair_color: "blonde", skin_color: "fair", eye_color: "blue"}}
```

```cypher
MATCH (luke:Character {name: "Luke Skywalker"}) SET luke = $luke_params RETURN luke
```

```cypher
MATCH (luke:Character {name: "Luke Skywalker"}) REMOVE luke.eye_color RETURN luke
```

```cypher
MERGE (r2d2:Character {name: "R2D2"}) RETURN r2d2
```

```cypher
MERGE (c3po:Character {name: "C-3PO"}) 
ON MATCH SET c3po.changed = timestamp()
ON CREATE SET c3po.changed = timestamp(), c3po.created = timestamp()
RETURN c3po
```

```cypher
MATCH (c3po:Character {name: "C-3PO"}) DELETE c3po
```

```cypher
MATCH (luke:Character {name: "Luke Skywalker}) DELETE luke
```

```cypher
MATCH (luke:Character {name: "Luke Skywalker}) DETACH DELETE luke
```

```cypher
MATCH (friend)-[relationship:HAS_SIDEKICK]->(sidekick) DELETE relationship RETURN friend, sidekick
```

```cypher
:params {
    alderan: {
        name: "Alderan",
        rotation_period: "24",
        orbital_period: "364",
        diameter: "12500",
        climate: "temperate",
        gravity: "1 standard",
        terrain: "grasslands, mountains",
        surface_water: "40",
        population: "2000000000"
    },
    hoth: {
        name: "Hoth",
        rotation_period: "23",
        orbital_period: "549",
        diameter: "7200",
        climate: "frozen",
        gravity: "1.1 standard",
        terrain: "tundra, ice caves, mountain ranges",
        surface_water: "100",
        population: "unknown"
    },
    c3po: {
        name: "C-3PO",
        height: "167",
        mass: "75",
        hair_color: "n/a",
        skin_color: "gold",
        eye_color: "yellow",
        birth_year: "112BBY",
        gender: "n/a"
    },
    r2d2: {
        name: "R2-D2",
        height: "96",
        mass: "32",
        hair_color: "n/a",
        skin_color: "white, blue",
        eye_color: "red",
        birth_year: "33BBY",
        gender: "n/a"
    }
}
```

```cypher
CREATE (alderan:Planet) SET alderan = $alderan
CREATE (hoth:Planet) SET hoth = $hoth
CREATE (c3po:Person) SET c3po = $c3po
CREATE (r2d2:Person) SET r2d2 = $r2d2
RETURN *
```

```cypher
CREATE (empire:Film {title: "The Empire Strikes Back"})
CREATE (luke)-[:HAS_SPECIES]->(human)
CREATE (luke)-[:HAS_HOMEWORLD]->(tatooine)
CREATE (luke)-[:APPEARED_IN]->(empire)
CREATE (human)-[:APPEARED_IN]->(empire)
CREATE (tatooine)-[:APPEARED_IN]->(empire)
RETURN *
```
